// Imports
import axios from 'axios'

// App imports
import { OAUTH_GITHUB_ID, OAUTH_GITHUB_SECRET, URL_WEB } from 'setup/config/env'
import params from 'setup/config/params'

// github
export default async function github({ code }) {
  let userProvider

  // 1. get access_token account using OAuth code
  const access = await axios({
    url: 'https://github.com/login/oauth/access_token',
    method: 'get',
    headers: { accept: 'application/json' },
    params: {
      client_id: OAUTH_GITHUB_ID,
      client_secret: OAUTH_GITHUB_SECRET,
      redirect_uri: `${URL_WEB}/${params.user.oauth.redirectUri}`,
      code,
    },
  })

  // 2. get user details
  if (access.data && access.data.access_token) {
    const me = await axios({
      url: 'https://api.github.com/user',
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `token ${access.data.access_token}`,
      },
    })

    if (me.data && me.data.id) {
      userProvider = {
        email: me.data.email,
        name: me.data.name,
      }
    }
  }

  return userProvider
}
