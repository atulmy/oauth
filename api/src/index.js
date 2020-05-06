// Imports
import express from 'express'

// App Imports
import { connect } from 'setup/server/database'
import middlewares from 'setup/server/middlewares'
import endpoint from 'setup/server/endpoint'
import start from 'setup/server/start'

// Create express server
const server = express()

// Connect database
connect()

// Setup middlewares
middlewares(server)

// Setup endpoint
endpoint(server)

// Start server
start(server)
