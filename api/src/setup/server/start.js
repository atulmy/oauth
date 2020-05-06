// Imports
import ip from 'ip'
import mongoose from 'mongoose'

// App imports
import { PORT, ENV } from 'setup/config/env'

// Start server
export default async function (server) {
  console.info('SETUP - Starting server..')

  server.set('trust proxy', true)

  const serverProcess = server.listen(PORT, async (error) => {
    if (error) {
      console.error('ERROR - Unable to start server.')
    } else {
      console.info(`INFO - Server started on`)
      console.info(`  Local   http://localhost:${PORT} [${ENV}]`)
      console.info(`  Network http://${ip.address()}:${PORT} [${ENV}]`)
      console.info(`  Datetime ${new Date()}\n`)
    }
  })

  serverProcess.setTimeout(500000)

  // Stop Server
  for (let signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, async () => {
      console.info('INFO - Shutting down server..')

      serverProcess.close(async () => {
        console.info('INFO - Server has been shut down.')

        mongoose.connection.close(false, async () => {
          console.info('INFO - Database disconnected.')
          process.exit(0)
        })
      })
    })
  }
}
