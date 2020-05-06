// Imports
import dotenv from 'dotenv'

// Load .env
dotenv.config({ path: '.env.local' })

// Environment
export const ENV = process.env.NODE_ENV

// Security
export const SECURITY_SECRET = process.env.SECURITY_SECRET
export const SECURITY_SALT_ROUNDS = parseInt(process.env.SECURITY_SALT_ROUNDS)

// Port
export const PORT = process.env.PORT

// Database
export const DATABASE_URL = process.env.DATABASE_URL

// URL
export const URL_API = process.env.URL_API
export const URL_WEB = process.env.URL_WEB

// Oauth
export const OAUTH_FACEBOOK_ID = process.env.OAUTH_FACEBOOK_ID
export const OAUTH_FACEBOOK_SECRET = process.env.OAUTH_FACEBOOK_SECRET
export const OAUTH_INSTAGRAM_ID = process.env.OAUTH_INSTAGRAM_ID
export const OAUTH_INSTAGRAM_SECRET = process.env.OAUTH_INSTAGRAM_SECRET
export const OAUTH_GOOGLE_ID = process.env.OAUTH_GOOGLE_ID
export const OAUTH_GOOGLE_SECRET = process.env.OAUTH_GOOGLE_SECRET
