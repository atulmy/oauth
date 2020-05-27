// Imports
import axios from 'axios'

// App imports
import {
  OAUTH_SHOPIFY_ID,
  OAUTH_SHOPIFY_SECRET,
  OAUTH_SHOPIFY_STORE,
} from 'setup/config/env'

// shopify
export default async function shopify({ code }) {
  let userProvider

  // 1. access_token account using OAuth code
  const access = await axios({
    url: `https://${OAUTH_SHOPIFY_STORE}.myshopify.com/admin/oauth/access_token`,
    method: 'post',
    params: {
      client_id: OAUTH_SHOPIFY_ID,
      client_secret: OAUTH_SHOPIFY_SECRET,
      code,
    },
  })

  // 2. get store details
  if (access.data && access.data.access_token) {
    const store = await axios({
      url: `https://${OAUTH_SHOPIFY_STORE}.myshopify.com/admin/api/2020-04/shop.json`,
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'X-Shopify-Access-Token': access.data.access_token,
      },
    })

    if (store.data && store.data && store.data.shop) {
      userProvider = {
        email: store.data.shop.email,
        name: store.data.shop.name,
      }
    }
  }

  return userProvider
}
