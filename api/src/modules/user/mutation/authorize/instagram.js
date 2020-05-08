// Imports
import axios from 'axios'

// App imports
import {
  OAUTH_INSTAGRAM_ID,
  OAUTH_INSTAGRAM_SECRET,
  URL_WEB,
} from 'setup/config/env'
import params from 'setup/config/params'

// instagram
export default async function instagram({ code }) {
  let userSocial

  // 1. get (short lived) access_token account using OAuth code
  const form = new URLSearchParams()
  form.append('client_id', OAUTH_INSTAGRAM_ID)
  form.append('client_secret', OAUTH_INSTAGRAM_SECRET)
  // form.append('redirect_uri', `${URL_WEB}/${params.user.oauth.redirectUri}`) // live
  form.append(
    'redirect_uri',
    `https://example.com/${params.user.oauth.redirectUri}`,
  ) // test
  form.append('grant_type', `authorization_code`)
  form.append('code', code)

  const short = await axios({
    url: 'https://api.instagram.com/oauth/access_token',
    method: 'post',
    data: form,
  })

  // 2. get (long lived) access_token account using OAuth code
  if (short.data && short.data.access_token) {
    const long = await axios({
      url: 'https://graph.instagram.com/access_token',
      method: 'get',
      params: {
        grant_type: 'ig_exchange_token',
        client_secret: OAUTH_INSTAGRAM_SECRET,
        access_token: short.data.access_token,
      },
    })

    // 3. get user details
    const me = await axios({
      url: 'https://graph.instagram.com/me',
      method: 'get',
      params: {
        fields: ['id', 'username', 'account_type', 'media_count'].join(','),
        client_secret: OAUTH_INSTAGRAM_SECRET,
        access_token: long.data.access_token,
      },
    })

    if (me.data && me.data.id) {
      userSocial = {
        email: `${me.data.username}@instagram.com`, // Instagram does not return `email` field
        name: me.data.username,
      }
    }
  }

  return userSocial
}
