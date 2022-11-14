import mongoose, { Schema } from 'mongoose'

const productsSchema = new Schema({
  productName: {
    type: String
  },
  sku: {
    type: String
  },
  price: {
    type: Number
  },
  quantity: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

productsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      productName: this.productName,
      sku: this.sku,
      price: this.price,
      quantity: this.quantity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Products', productsSchema)

export const schema = model.schema
export default model
