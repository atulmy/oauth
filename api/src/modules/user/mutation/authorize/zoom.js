// Imports
import axios from 'axios'

// App imports
import { OAUTH_ZOOM_ID, OAUTH_ZOOM_SECRET, URL_WEB } from 'setup/config/env'
import params from 'setup/config/params'

// zoom
export default async function zoom({ code }) {
  let userProvider

  // 1. get access_token account using OAuth code
  const access = await axios({
    url: 'https://zoom.us/oauth/token',
    method: 'post',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${OAUTH_ZOOM_ID}:${OAUTH_ZOOM_SECRET}`,
      ).toString('base64')}`,
    },
    params: {
      redirect_uri: `${URL_WEB}/${params.user.oauth.redirectUri}`,
      grant_type: `authorization_code`,
      code,
    },
  })

  // 2. get user details
  if (access.data && access.data.access_token) {
    const me = await axios({
      url: 'https://api.zoom.us/v2/users/me',
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access.data.access_token}`,
      },
    })

    if (me.data && me.data.id) {
      userProvider = {
        email: me.data.email,
        name: `${me.data.first_name} ${me.data.last_name}`,
      }
    }
  }

  return userProvider
}
