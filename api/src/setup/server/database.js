// Imports
import mongoose from 'mongoose'

// App Imports
import { ENV, DATABASE_URL } from 'setup/config/env'

// Connect database
export async function connect() {
  console.info('SETUP - Connecting database..')

  await connectWithRetry()
}

// Disconnect database
export async function close() {
  console.info('INFO - Disconnecting database..')

  return await mongoose.connection.close()
}

// Drop database
export async function drop() {
  if (ENV === 'development') {
    console.info('INFO - Dropping database..')

    return await mongoose.connection.dropDatabase()
  }
}

// Handle connection error
mongoose.connection.on('error', (error) => {
  console.log(`ERROR - Connection failed: ${error.message}`)

  setTimeout(async () => {
    console.log('SETUP - Connecting database.. retrying..')

    await connectWithRetry()
  }, 5000)
})

// Retry connection
const connectWithRetry = async () => {
  return await mongoose.connect(DATABASE_URL)
}
