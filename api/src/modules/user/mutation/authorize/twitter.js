// Imports
import axios from 'axios'

// App imports
import { OAUTH_TWITTER_ID, URL_WEB } from 'setup/config/env'
import params from 'setup/config/params'

// twitter
export default async function twitter({ code }) {
  let userProvider

  // 1. access_token account using OAuth code
  const form = new URLSearchParams()
  form.append('client_id', OAUTH_TWITTER_ID)
  form.append('redirect_uri', `${URL_WEB}/${params.user.oauth.redirectUri}`)
  form.append('grant_type', `authorization_code`)
  form.append('code_verifier', `code_challenge`)
  form.append('code', code)

  const access = await axios({
    url: `https://api.twitter.com/2/oauth2/token`,
    method: 'post',
    data: form,
  })

  // 2. get user details
  if (access.data && access.data.access_token) {
    const me = await axios({
      url: 'https://api.twitter.com/2/users/me',
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access.data.access_token}`,
      },
    })

    if (me.data && me.data.data) {
      userProvider = {
        // since twitter does not return email, we construct a dummy email for database
        email: `${me.data.data.username}.${me.data.data.id}@example.com`,
        name: me.data.data.name,
      }
    }
  }

  return userProvider
}
