// Imports
import * as queryString from 'query-string'

// App imports
import { URL_WEB, OAUTH_TWITTER_ID } from 'setup/config/env'
import routes from 'setup/routes'
import params from 'setup/config/params'

// twitter
export default function twitter() {
  const url = queryString.stringifyUrl(
    {
      url: `https://twitter.com/i/oauth2/authorize`,
      query: {
        client_id: OAUTH_TWITTER_ID,
        redirect_uri: `${URL_WEB}${routes.pagesAuthorize.path}/`,
        response_type: 'code',
        scope: ['offline.access', 'users.read', 'tweet.read'].join(' '),
        code_challenge: 'code_challenge',
        code_challenge_method: 'plain',
        state: params.user.oauth.providers.twitter.key,
      },
    },
    { encode: false },
  )

  console.log(url)

  return url
}
