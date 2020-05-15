// App imports
import { authCheck } from 'setup/helpers/utils'
import { AuthError } from 'modules/common/errors'
import Note from 'modules/note/model'

// List
export default async function list({ auth }) {
  if (authCheck(auth)) {
    try {
      // Note
      const data = await Note.find({
        userId: auth.user._id,
        isDeleted: false,
      }).sort({ createdAt: -1 })

      return {
        data,
      }
    } catch (error) {
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
