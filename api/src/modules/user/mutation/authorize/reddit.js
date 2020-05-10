// Imports
import axios from 'axios'

// App imports
import { OAUTH_REDDIT_ID, OAUTH_REDDIT_SECRET, URL_WEB } from 'setup/config/env'
import params from 'setup/config/params'

// reddit
export default async function reddit({ code }) {
  let userProvider

  // 1. get access_token account using OAuth code
  const access = await axios({
    url: 'https://www.reddit.com/api/v1/access_token',
    method: 'post',
    headers: { accept: 'application/json' },
    auth: {
      username: OAUTH_REDDIT_ID,
      password: OAUTH_REDDIT_SECRET,
    },
    params: {
      redirect_uri: `${URL_WEB}/${params.user.oauth.redirectUri}`,
      grant_type: 'authorization_code',
      code,
    },
  })

  // 2. get user details
  if (access.data && access.data.access_token) {
    const me = await axios({
      url: 'https://oauth.reddit.com/api/v1/me',
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${access.data.access_token}`,
      },
    })

    if (me.data && me.data.name) {
      userProvider = {
        email: `${me.data.name}@reddit.com`, // Reddit does not return `email` field
        name: me.data.name,
      }
    }
  }

  return userProvider
}
