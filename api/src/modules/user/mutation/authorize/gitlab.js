// Imports
import axios from 'axios'

// App imports
import { OAUTH_GITLAB_ID, OAUTH_GITLAB_SECRET, URL_WEB } from 'setup/config/env'
import params from 'setup/config/params'

// gitlab
export default async function gitlab({ code }) {
  let userProvider

  // 1. get access_token account using OAuth code
  const access = await axios({
    url: `https://gitlab.com/oauth/token`,
    method: 'post',
    params: {
      client_id: OAUTH_GITLAB_ID,
      client_secret: OAUTH_GITLAB_SECRET,
      redirect_uri: `${URL_WEB}/${params.user.oauth.redirectUri}`,
      grant_type: 'authorization_code',
      code,
    },
  })

  // 2. get user details
  if (access.data && access.data.access_token) {
    const me = await axios({
      url: 'https://gitlab.com/api/v4/user',
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access.data.access_token}`,
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
