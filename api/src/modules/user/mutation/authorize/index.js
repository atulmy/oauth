// Imports
import axios from 'axios'
import bcrypt from 'bcrypt'
import moment from 'moment'

// App imports
import {
  SECURITY_SALT_ROUNDS,
  OAUTH_FACEBOOK_ID,
  OAUTH_FACEBOOK_SECRET,
  URL_WEB,
} from 'setup/config/env'
import params from 'setup/config/params'
import v from 'setup/helpers/validation'
import { randomNumber } from 'setup/helpers/utils'
import { AuthError, ValidationError } from 'modules/common/errors'
import User from 'modules/user/model'
import authResponse from 'modules/user/query/authResponse'

// authorize
export default async function authorize({ params: { code, state } }) {
  // Validation rules
  const rules = [
    {
      data: { value: code },
      check: 'isNotEmpty',
      message: 'Invalid code.',
    },
    {
      data: { value: state },
      check: 'isNotEmpty',
      message: 'Invalid state.',
    },
  ]

  // Validate
  try {
    v.validate(rules)
  } catch (error) {
    throw new ValidationError(error.message)
  }

  try {
    const stateParsed = JSON.parse(state)

    // 1. get access_token account using OAuth code
    const access = await axios({
      url: 'https://graph.facebook.com/v6.0/oauth/access_token',
      method: 'get',
      params: {
        client_id: OAUTH_FACEBOOK_ID,
        client_secret: OAUTH_FACEBOOK_SECRET,
        redirect_uri: `${URL_WEB}/${params.user.oauth.redirectUri}`,
        code,
      },
    })

    if (access.data && access.data.access_token) {
      // 2. get user details
      const me = await axios({
        url: 'https://graph.facebook.com/me',
        method: 'get',
        params: {
          fields: [
            'id',
            'email',
            'first_name',
            'last_name',
            'picture.type(large)',
          ].join(','),
          access_token: access.data.access_token,
        },
      })

      if (me.data && me.data.id) {
        // 3. check user already exists
        let user = await User.findOne({ email: me.data.email })

        if (!user) {
          // 4. create new user

          // create new password
          const password = randomNumber(100000, 999999)

          // User - create
          user = await User.create({
            email: me.data.email,
            password: await bcrypt.hash(`${password}`, SECURITY_SALT_ROUNDS),
            name: `${me.data.first_name} ${me.data.last_name}`,
          })
        }

        return {
          data: await authResponse(user),
          message: `Welcome ${user.name}!`,
        }
      }
    }

    return {
      data: false,
      success: false,
      message: `Unable to connect to ${params.user.oauth.providers.facebook.title}.`,
    }
  } catch (error) {
    // console.log(error)
    throw new Error(`An error occurred. ${error.message}`)
  }

  throw new AuthError('You are not authorized to perform this action.')
}
