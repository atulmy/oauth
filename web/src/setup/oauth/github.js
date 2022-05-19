// Imports
import * as queryString from 'query-string'

// App imports
import { URL_WEB, OAUTH_GITHUB_ID } from 'setup/config/env'
import routes from 'setup/routes'
import params from 'setup/config/params'

// github
export default function github() {
  const url = queryString.stringifyUrl(
    {
      url: 'https://github.com/login/oauth/authorize',
      query: {
        client_id: OAUTH_GITHUB_ID,
        redirect_uri: `${URL_WEB}${routes.pagesAuthorize.path}/`,
        scope: 'read:user repo',
        state: params.user.oauth.providers.github.key,
      },
    },
    { encode: false },
  )

  console.log(url)

  return url
}
