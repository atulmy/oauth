// Imports
import * as queryString from 'query-string'

// App imports
import { URL_WEB, OAUTH_BITBUCKET_ID } from 'setup/config/env'
import routes from 'setup/routes'
import params from 'setup/config/params'

// bitbucket
export default function bitbucket() {
  const url = queryString.stringifyUrl(
    {
      url: 'https://bitbucket.org/site/oauth2/authorize',
      query: {
        client_id: OAUTH_BITBUCKET_ID,
        response_type: 'code',
        state: JSON.stringify({
          provider: params.user.oauth.providers.bitbucket.key,
        }),
      },
    },
    { encode: false },
  )

  console.log(url)

  return url
}
