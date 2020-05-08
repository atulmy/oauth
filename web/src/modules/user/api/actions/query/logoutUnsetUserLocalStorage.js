// Unset user token and info in localStorage and cookie
export default function logoutUnsetUserLocalStorage() {
  // Remove token
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
}
