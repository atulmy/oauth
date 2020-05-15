// App imports
import params from 'setup/config/params'
import { authCheck } from 'setup/helpers/utils'
import v from 'setup/helpers/validation'
import { AuthError, ValidationError } from 'modules/common/errors'
import Note from 'modules/note/model'

// Save
export default async function save({ params: { text }, auth }) {
  if (authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: text },
        check: 'isNotEmpty',
        message: 'Invalid text.',
      },
    ]

    // Validate
    try {
      v.validate(rules)
    } catch (error) {
      throw new ValidationError(error.message)
    }

    try {
      const fields = { userId: auth.user._id, text }

      // Note
      const data = await Note.create({
        ...fields,
        isDeleted: false,
      })

      return {
        data,
        message: `Note has been saved successfully.`,
      }
    } catch (error) {
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
