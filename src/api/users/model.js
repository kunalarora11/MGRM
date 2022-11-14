import mongoose, { Schema } from 'mongoose'

const usersSchema = new Schema({
  fullName: {
    type: String
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  pinCode: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

usersSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      address: this.address,
      country: this.country,
      state: this.state,
      city: this.city,
      pinCode: this.pinCode,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Users', usersSchema)

export const schema = model.schema
export default model
