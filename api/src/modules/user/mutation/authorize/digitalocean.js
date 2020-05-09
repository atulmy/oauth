// Imports
import axios from 'axios'

// App imports
import {
  OAUTH_DIGITALOCEAN_ID,
  OAUTH_DIGITALOCEAN_SECRET,
  URL_WEB,
} from 'setup/config/env'
import params from 'setup/config/params'

// digitalocean
export default async function digitalocean({ code }) {
  let userProvider

  // 1. get access_token account using OAuth code
  const access = await axios({
    url: 'https://cloud.digitalocean.com/v1/oauth/token',
    method: 'post',
    headers: { accept: 'application/json' },
    params: {
      client_id: OAUTH_DIGITALOCEAN_ID,
      client_secret: OAUTH_DIGITALOCEAN_SECRET,
      redirect_uri: `${URL_WEB}/${params.user.oauth.redirectUri}`,
      grant_type: 'authorization_code',
      code,
    },
  })

  // 2. get user details
  if (access.data && access.data.access_token) {
    const me = await axios({
      url: 'https://api.digitalocean.com/v2/account',
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access.data.access_token}`,
      },
    })

    if (me.data && me.data.account) {
      userProvider = {
        email: me.data.account.email,
        name: access.data.info.name,
      }
    }
  }

  return userProvider
}
