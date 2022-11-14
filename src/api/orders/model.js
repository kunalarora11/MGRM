import mongoose, { Schema } from 'mongoose'

const ordersSchema = new Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
    refs: 'products'
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    refs: 'users'
  },
  orderDate: {
    type: Date,
    default: null
  },
  paymentStatus: {
    type: Number,
    default: 0
    // 0 -> pending,
    // 1 -> paid,
    // 2 -> cancelled,
  },
  paidOn: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

ordersSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      productId: this.productId,
      userId: this.userId,
      orderDate: this.orderDate,
      paymentStatus: this.paymentStatus,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Orders', ordersSchema)

export const schema = model.schema
export default model
