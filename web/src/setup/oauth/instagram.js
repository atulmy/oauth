// Imports
import * as queryString from 'query-string'

// App imports
import { URL_WEB, OAUTH_INSTAGRAM_ID } from 'setup/config/env'
import params from 'setup/config/params'
import routes from 'setup/routes'

// instagram
export default function instagram() {
  const url = queryString.stringifyUrl(
    {
      url: 'https://api.instagram.com/oauth/authorize',
      query: {
        client_id: OAUTH_INSTAGRAM_ID,
        // redirect_uri: `${URL_WEB}${routes.pagesAuthorize.path}/`, // for live
        redirect_uri: `https://example.com${routes.pagesAuthorize.path}/`, // for testing
        scope: 'user_profile,user_media',
        response_type: 'code',
        state: JSON.stringify({
          provider: params.user.oauth.providers.instagram.key,
        }),
      },
    },
    { encode: false },
  )

  console.log(url)

  return url
}
