// Imports
import axios from 'axios'

// App imports
import { OAUTH_GOOGLE_ID, OAUTH_GOOGLE_SECRET, URL_WEB } from 'setup/config/env'
import params from 'setup/config/params'

// google
export default async function google({ code }) {
  let userSocial

  // 1. get access_token account using OAuth code
  const access = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: OAUTH_GOOGLE_ID,
      client_secret: OAUTH_GOOGLE_SECRET,
      redirect_uri: `${URL_WEB}/${params.user.oauth.redirectUri}`,
      grant_type: 'authorization_code',
      code,
    },
  })

  // 2. get user details
  if (access.data && access.data.access_token) {
    const me = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${access.data.access_token}`,
      },
    })

    if (me.data && me.data.id) {
      userSocial = {
        email: me.data.email,
        name: me.data.name,
      }
    }
  }

  return userSocial
}
