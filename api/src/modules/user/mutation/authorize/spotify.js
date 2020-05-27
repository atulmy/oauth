// Imports
import axios from 'axios'

// App imports
import {
  OAUTH_SPOTIFY_ID,
  OAUTH_SPOTIFY_SECRET,
  URL_WEB,
} from 'setup/config/env'
import params from 'setup/config/params'

// spotify
export default async function spotify({ code }) {
  let userProvider

  // 1. access_token account using OAuth code
  const access = await axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${OAUTH_SPOTIFY_ID}:${OAUTH_SPOTIFY_SECRET}`,
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
      url: 'https://api.spotify.com/v1/me',
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access.data.access_token}`,
      },
    })

    if (me.data && me.data.id) {
      userProvider = {
        email: me.data.email,
        name: me.data.display_name,
      }
    }
  }

  return userProvider
}
