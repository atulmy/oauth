// App imports
import PagesHome from 'modules/pages/Home'
import PagesAuthorize from 'modules/pages/Authorize'
import UserDashboard from 'modules/user/Dashboard'

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

  // user dashboard
  userDashboard: {
    path: '/dashboard',
    component: UserDashboard,
    auth: true,
  },
}

export default routes
