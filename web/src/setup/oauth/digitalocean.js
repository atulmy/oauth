// Imports
import * as queryString from 'query-string'

// App imports
import { URL_WEB, OAUTH_DIGITALOCEAN_ID } from 'setup/config/env'
import routes from 'setup/routes'
import params from 'setup/config/params'

// digitalocean
export default function digitalocean() {
  const url = queryString.stringifyUrl(
    {
      url: 'https://cloud.digitalocean.com/v1/oauth/authorize',
      query: {
        client_id: OAUTH_DIGITALOCEAN_ID,
        redirect_uri: `${URL_WEB}${routes.pagesAuthorize.path}/`,
        scope: 'read',
        response_type: 'code',
        state: params.user.oauth.providers.digitalocean.key,
      },
    },
    { encode: false },
  )

  console.log(url)

  return url
}
