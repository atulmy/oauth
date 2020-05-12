// Imports
import axios from 'axios'

// App imports
import {
  OAUTH_DISCORD_ID,
  OAUTH_DISCORD_SECRET,
  URL_WEB,
} from 'setup/config/env'
import params from 'setup/config/params'

// discord
export default async function discord({ code }) {
  let userProvider

  // 1. access_token account using OAuth code
  const form = new URLSearchParams()
  form.append('client_id', OAUTH_DISCORD_ID)
  form.append('client_secret', OAUTH_DISCORD_SECRET)
  form.append('redirect_uri', `${URL_WEB}/${params.user.oauth.redirectUri}`)
  form.append('grant_type', `authorization_code`)
  form.append('scope', `identify email`)
  form.append('code', code)

  const access = await axios({
    url: 'https://discordapp.com/api/oauth2/token',
    method: 'post',
    data: form,
  })

  // 2. get user details
  if (access.data && access.data.access_token) {
    const me = await axios({
      url: 'https://discordapp.com/api/users/@me',
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access.data.access_token}`,
      },
    })

    if (me.data && me.data.id) {
      userProvider = {
        email: me.data.email,
        name: me.data.username,
      }
    }
  }

  return userProvider
}
