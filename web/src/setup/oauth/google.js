// Imports
import * as queryString from 'query-string'

// App imports
import { URL_WEB, OAUTH_GOOGLE_ID } from 'setup/config/env'
import params from 'setup/config/params'
import routes from 'setup/routes'

// google
export default function google() {
  const url = queryString.stringifyUrl(
    {
      url: 'https://accounts.google.com/o/oauth2/v2/auth',
      query: {
        client_id: OAUTH_GOOGLE_ID,
        redirect_uri: `${URL_WEB}${routes.pagesAuthorize.path}/`,
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '),
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
        state: params.user.oauth.providers.google.key,
      },
    },
    { encode: false },
  )

  console.log(url)

  return url
}
