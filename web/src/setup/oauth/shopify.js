// Imports
import * as queryString from 'query-string'

// App imports
import {
  URL_WEB,
  OAUTH_SHOPIFY_ID,
  OAUTH_SHOPIFY_STORE,
} from 'setup/config/env'
import routes from 'setup/routes'
import params from 'setup/config/params'

// shopify
export default function shopify() {
  const url = queryString.stringifyUrl(
    {
      url: `https://${OAUTH_SHOPIFY_STORE}.myshopify.com/admin/oauth/authorize`,
      query: {
        client_id: OAUTH_SHOPIFY_ID,
        redirect_uri: `${URL_WEB}${routes.pagesAuthorize.path}/`,
        scope: ['read_orders'].join(','),
        response_type: 'code',
        nonce: `${Date.now()}`,
        state: params.user.oauth.providers.shopify.key,
      },
    },
    { encode: false },
  )

  console.log(url)

  return url
}
