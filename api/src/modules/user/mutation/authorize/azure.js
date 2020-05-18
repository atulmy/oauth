// Imports
import axios from 'axios'

// App imports
import {
  OAUTH_AZURE_ID,
  OAUTH_AZURE_SECRET,
  OAUTH_AZURE_TENANT,
  URL_WEB,
} from 'setup/config/env'
import params from 'setup/config/params'

// azure
export default async function azure({ code }) {
  let userProvider

  // 1. access_token account using OAuth code
  const form = new URLSearchParams()
  form.append('client_id', OAUTH_AZURE_ID)
  form.append('client_secret', OAUTH_AZURE_SECRET)
  form.append('redirect_uri', `${URL_WEB}/${params.user.oauth.redirectUri}`)
  form.append('grant_type', `authorization_code`)
  form.append(
    'scope',
    [
      'offline_access',
      'openid',
      'email',
      'profile',
      'https://graph.microsoft.com/user.read',
    ].join(' '),
  )
  form.append('code', code)

  const access = await axios({
    url: `https://login.microsoftonline.com/${OAUTH_AZURE_TENANT}/oauth2/v2.0/token`,
    method: 'post',
    data: form,
  })

  // 2. get user details
  if (access.data && access.data.access_token) {
    const me = await axios({
      url: 'https://graph.microsoft.com/v1.0/me',
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access.data.access_token}`,
      },
    })

    if (me.data && me.data.id) {
      userProvider = {
        email: me.data.userPrincipalName,
        name: me.data.displayName,
      }
    }
  }

  return userProvider
}
