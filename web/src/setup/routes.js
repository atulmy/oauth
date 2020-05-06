// App imports
import PagesHome from 'modules/pages/Home'
import PagesAuthorize from 'modules/pages/Authorize'

// Combined routes
const routes = {
  // pages home
  pagesHome: {
    path: '/',
    component: PagesHome,
    exact: true,
  },

  // pages authorize
  pagesAuthorize: {
    path: '/authorize',
    component: PagesAuthorize,
  },
}

export default routes
