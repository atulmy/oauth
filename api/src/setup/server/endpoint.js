// App Imports
import { ENV } from 'setup/config/env'
import params from 'setup/config/params'
import authentication from 'setup/server/authentication'
import modules from './modules'

// Setup endpoint
export default function (server) {
  console.info('SETUP - Endpoint..')

  // API endpoint
  server.all(
    params.common.endpoint.url,
    [authentication],
    async (request, response) => {
      let result = {
        success: false,
        message: 'Please try again.',
        code: 'default',
        data: null,
      }

      // Check if operation to be called is set
      let operation =
        modules[request.body.operation] || modules[request.params.operation]

      if (operation) {
        try {
          // Execute operation
          // operationName({ params, fields, auth })
          const {
            data,
            message = 'Success.',
            success = true,
          } = await operation({
            params: request.body.params || request.query || {},
            fields: request.body.fields || {},
            auth: request.auth,
          })

          // Operation executed successfully
          result.success = success
          result.data = data
          result.message = message
        } catch (error) {
          result.message = error.message
          result.code = error.code || 'default'
        }
      } else {
        result.message = `${request.body.operation} operation is not available.`
      }

      // Log info in development mode
      if (ENV === 'development') {
        console.log(request.body)
        console.log(result.success, result.message)
      }

      // Send response
      response.send(result)
    },
  )
}
