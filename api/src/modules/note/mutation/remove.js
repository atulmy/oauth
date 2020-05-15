// App imports
import { authCheck } from 'setup/helpers/utils'
import v from 'setup/helpers/validation'
import { AuthError, ValidationError } from 'modules/common/errors'
import Note from 'modules/note/model'

// Remove
export default async function remove({ params: { noteId }, auth }) {
  if (authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: noteId },
        check: 'isNotEmpty',
        message: 'Invalid note.',
      },
    ]

    // Validate
    try {
      v.validate(rules)
    } catch (error) {
      throw new ValidationError(error.message)
    }

    try {
      // Note
      const data = await Note.updateOne(
        { _id: noteId },
        { $set: { isDeleted: true } },
      )

      return {
        data,
        message: `Note has been removed successfully.`,
      }
    } catch (error) {
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
