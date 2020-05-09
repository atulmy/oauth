// Imports
import axios from 'axios'

// App imports
import { OAUTH_BITBUCKET_ID, OAUTH_BITBUCKET_SECRET } from 'setup/config/env'

// bitbucket
export default async function bitbucket({ code }) {
  let userProvider

  // 1. get access_token account using OAuth code
  const form = new URLSearchParams()
  form.append('grant_type', 'authorization_code')
  form.append('code', code)
  const access = await axios({
    url: 'https://bitbucket.org/site/oauth2/access_token',
    method: 'post',
    data: form,
    auth: {
      username: OAUTH_BITBUCKET_ID,
      password: OAUTH_BITBUCKET_SECRET,
    },
  })

  // 2. get user details
  if (access.data && access.data.access_token) {
    const me = await axios({
      url: 'https://api.bitbucket.org/2.0/user',
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access.data.access_token}`,
      },
    })

    if (me.data && me.data) {
      // 3. get user emails
      const emails = await axios({
        url: 'https://api.bitbucket.org/2.0/user/emails',
        method: 'get',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${access.data.access_token}`,
        },
      })

      if (emails && emails.data) {
        userProvider = {
          email: emails.data.values[0].email,
          name: me.data.display_name,
        }
      }
    }
  }

  return userProvider
}
