// Imports
import * as queryString from 'query-string'

// App imports
import { URL_WEB, OAUTH_SPOTIFY_ID } from 'setup/config/env'
import routes from 'setup/routes'
import params from 'setup/config/params'

// spotify
export default function spotify() {
  const url = queryString.stringifyUrl(
    {
      url: 'https://accounts.spotify.com/authorize',
      query: {
        client_id: OAUTH_SPOTIFY_ID,
        redirect_uri: `${URL_WEB}${routes.pagesAuthorize.path}/`,
        scope: ['user-read-email'].join(' '),
        response_type: 'code',
        state: JSON.stringify({
          provider: params.user.oauth.providers.spotify.key,
        }),
      },
    },
    { encode: false },
  )

  console.log(url)

  return url
}
