// Imports
import bcrypt from 'bcrypt'

// App imports
import { SECURITY_SALT_ROUNDS } from 'setup/config/env'
import params from 'setup/config/params'
import v from 'setup/helpers/validation'
import { randomNumber } from 'setup/helpers/utils'
import { ValidationError } from 'modules/common/errors'
import User from 'modules/user/model'
import authResponse from 'modules/user/query/authResponse'
import facebook from './facebook'

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
    let response = {
      success: false,
      message: `Unable to connect to ${params.user.oauth.providers.facebook.key}.`,
      data: false,
    }

    let userSocial

    const stateParsed = JSON.parse(state)

    // get user details from the platform
    switch (stateParsed.provider) {
      case params.user.oauth.providers.facebook.key:
        userSocial = await facebook({ code })
        break
    }

    // console.log('userSocial', userSocial)

    if (userSocial) {
      // check user already exists
      let user = await User.findOne({ email: userSocial.email })

      // create new user
      if (!user) {
        // create new password
        const password = randomNumber(100000, 999999)

        // User - create
        user = await User.create({
          email: userSocial.email,
          name: userSocial.name,
          password: await bcrypt.hash(`${password}`, SECURITY_SALT_ROUNDS),
        })
      }

      // create JWT auth token
      response.success = true
      response.message = `Welcome ${user.name}!`
      response.data = await authResponse(user)
    }

    return response
  } catch (error) {
    console.log(error)
    throw new Error(`An error occurred. ${error.message}`)
  }
}
