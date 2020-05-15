// App imports
import { authCheck } from 'setup/helpers/utils'
import { AuthError } from 'modules/common/errors'
import User from 'modules/user/model'

// Profile
export default async function profile({ auth }) {
  console.log('auth', auth)
  if (authCheck(auth)) {
    try {
      // User
      const data = await User.findOne({ _id: auth.user._id })

      return {
        data,
      }
    } catch (error) {
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
