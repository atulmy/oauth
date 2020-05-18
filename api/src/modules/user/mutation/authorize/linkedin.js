// Imports
import axios from 'axios'

// App imports
import {
  OAUTH_LINKEDIN_ID,
  OAUTH_LINKEDIN_SECRET,
  URL_WEB,
} from 'setup/config/env'
import params from 'setup/config/params'

// linkedin
export default async function linkedin({ code }) {
  let userProvider

  // 1. access_token account using OAuth code
  const form = new URLSearchParams()
  form.append('client_id', OAUTH_LINKEDIN_ID)
  form.append('client_secret', OAUTH_LINKEDIN_SECRET)
  form.append('redirect_uri', `${URL_WEB}/${params.user.oauth.redirectUri}`)
  form.append('grant_type', `authorization_code`)
  form.append('code', code)

  const access = await axios({
    url: `https://www.linkedin.com/oauth/v2/accessToken`,
    method: 'post',
    data: form,
  })

  // 2. get user details
  if (access.data && access.data.access_token) {
    const me = await axios({
      url: 'https://api.linkedin.com/v2/me',
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access.data.access_token}`,
      },
    })

    const meEmail = await axios({
      url:
        'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))',
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${access.data.access_token}`,
      },
    })

    if (me.data && meEmail.data) {
      userProvider = {
        email: meEmail.data.elements[0]['handle~'].emailAddress,
        name: `${me.data.localizedFirstName} ${me.data.localizedLastName}`,
      }
    }
  }

  return userProvider
}
