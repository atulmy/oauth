// Imports
import axios from 'axios'

// App imports
import {
  OAUTH_FACEBOOK_ID,
  OAUTH_FACEBOOK_SECRET,
  URL_WEB,
} from 'setup/config/env'
import params from 'setup/config/params'

// facebook
export default async function facebook({ code }) {
  let userSocial

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
        fields: ['id', 'email', 'name'].join(','),
        access_token: access.data.access_token,
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
