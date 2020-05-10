// Imports
import * as queryString from 'query-string'

// App imports
import { URL_WEB, OAUTH_REDDIT_ID } from 'setup/config/env'
import routes from 'setup/routes'
import params from 'setup/config/params'

// reddit
export default function reddit() {
  const url = queryString.stringifyUrl(
    {
      url: 'https://www.reddit.com/api/v1/authorize',
      query: {
        client_id: OAUTH_REDDIT_ID,
        redirect_uri: `${URL_WEB}${routes.pagesAuthorize.path}/`,
        response_type: 'code',
        duration: 'temporary',
        scope: 'identity',
        state: JSON.stringify({
          provider: params.user.oauth.providers.reddit.key,
        }),
      },
    },
    { encode: false },
  )

  console.log(url)

  return url
}
