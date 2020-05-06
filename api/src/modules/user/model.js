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
    },

    password: {
      type: String,
      required: true,
    },

    nameFirst: {
      type: String,
      required: true,
    },

    nameLast: {
      type: String,
      required: true,
    },

    facebook: {
      type: Object,
    },

    google: {
      type: Object,
    },

    instagram: {
      type: Object,
    },

    image: {
      type: String,
      required: true,
    },

    profile: {
      type: Object,
    },
  },
  { timestamps: true },
)

// Model
export default mongoose.model(collection, schema, collection)
