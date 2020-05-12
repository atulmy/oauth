// Imports
import * as queryString from 'query-string'

// App imports
import { URL_WEB, OAUTH_DISCORD_ID } from 'setup/config/env'
import routes from 'setup/routes'
import params from 'setup/config/params'

// discord

export default function discord() {
  const url = queryString.stringifyUrl(
    {
      url: 'https://discordapp.com/api/oauth2/authorize',
      query: {
        client_id: OAUTH_DISCORD_ID,
        redirect_uri: `${URL_WEB}${routes.pagesAuthorize.path}/`,
        response_type: 'code',
        scope: 'identify email',
        state: JSON.stringify({
          provider: params.user.oauth.providers.discord.key,
        }),
      },
    },
    { encode: false },
  )

  console.log(url)

  return url
}
