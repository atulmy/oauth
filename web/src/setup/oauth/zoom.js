// Imports
import * as queryString from 'query-string'

// App imports
import { URL_WEB, OAUTH_ZOOM_ID } from 'setup/config/env'
import routes from 'setup/routes'
import params from 'setup/config/params'

// github
export default function zoom() {
  const url = queryString.stringifyUrl(
    {
      url: 'https://zoom.us/oauth/authorize',
      query: {
        client_id: OAUTH_ZOOM_ID,
        redirect_uri: `${URL_WEB}${routes.pagesAuthorize.path}/`,
        response_type: 'code',
        state: JSON.stringify({
          provider: params.user.oauth.providers.zoom.key,
        }),
      },
    },
    { encode: false },
  )

  console.log(url)

  return url
}
