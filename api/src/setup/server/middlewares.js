// Imports
import path from 'path'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'

// App Imports
import { ENV, URL_WEB } from 'setup/config/env'

// Setup middlewares
export default function (server) {
  console.info('SETUP - Middlewares..')

  // Enable CORS
  server.use(
    cors({
      origin: [URL_WEB],
    }),
  )

  // Request body parser
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: false }))

  // Static files folder
  server.use(express.static(path.join(__dirname, '..', '..', '..', 'public')))

  // HTTP logger
  if (ENV === 'development') {
    server.use(morgan('tiny'))
  }
}
