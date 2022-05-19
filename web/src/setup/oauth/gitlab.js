// Imports
import * as queryString from 'query-string'

// App imports
import { URL_WEB, OAUTH_GITLAB_ID } from 'setup/config/env'
import routes from 'setup/routes'
import params from 'setup/config/params'

// gitlab
export default function gitlab() {
  const url = queryString.stringifyUrl(
    {
      url: 'https://gitlab.com/oauth/authorize',
      query: {
        client_id: OAUTH_GITLAB_ID,
        redirect_uri: `${URL_WEB}${routes.pagesAuthorize.path}/`,
        scope: 'read_user+profile+email',
        response_type: 'code',
        state: params.user.oauth.providers.gitlab.key,
      },
    },
    { encode: false },
  )

  console.log(url)

  return url
}
