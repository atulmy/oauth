// Imports
import * as queryString from 'query-string'

// App imports
import { URL_WEB, OAUTH_LINKEDIN_ID } from 'setup/config/env'
import routes from 'setup/routes'
import params from 'setup/config/params'

// linkedin
export default function linkedin() {
  const url = queryString.stringifyUrl(
    {
      url: `https://www.linkedin.com/oauth/v2/authorization`,
      query: {
        client_id: OAUTH_LINKEDIN_ID,
        redirect_uri: `${URL_WEB}${routes.pagesAuthorize.path}/`,
        response_type: 'code',
        scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social'].join(' '),
        state: JSON.stringify({
          provider: params.user.oauth.providers.linkedin.key,
        }),
      },
    },
    { encode: false },
  )

  console.log(url)

  return url
}
