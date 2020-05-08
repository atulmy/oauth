// Imports
import mongoose, { Schema } from 'mongoose'

// Collection name
export const collection = 'User'

// Schema
const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

// Model
export default mongoose.model(collection, schema, collection)
