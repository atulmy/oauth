// Imports
import * as queryString from 'query-string'

// App imports
import { URL_WEB, OAUTH_AZURE_ID, OAUTH_AZURE_TENANT } from 'setup/config/env'
import routes from 'setup/routes'
import params from 'setup/config/params'

// azure
export default function azure() {
  const url = queryString.stringifyUrl(
    {
      url: `https://login.microsoftonline.com/${OAUTH_AZURE_TENANT}/oauth2/v2.0/authorize`,
      query: {
        client_id: OAUTH_AZURE_ID,
        redirect_uri: `${URL_WEB}${routes.pagesAuthorize.path}/`,
        response_type: 'code',
        response_mode: 'query',
        scope: [
          'offline_access',
          'openid',
          'email',
          'profile',
          'https://graph.microsoft.com/user.read',
        ].join(' '),
        state: params.user.oauth.providers.azure.key,
      },
    },
    { encode: false },
  )

  console.log(url)

  return url
}
