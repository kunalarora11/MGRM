import { success, notFound } from '../../services/response/'
import { Orders } from '.'
import { razorPayKey, razorPaySecret } from '../../config'
import axios from 'axios'
import { Products } from '../products'
import Razorpay from 'razorpay'

export const create = ({ body }, res, next) => {

  body.orderDate = new Date()

  Orders.create(body)
    .then((orders) => orders.view(true))
    .then(success(res, 201))
    .catch(next)
}
  

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Orders.find(query, select, cursor)
    .then((orders) => orders.map((orders) => orders.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Orders.findById(params.id)
    .then(notFound(res))
    .then((orders) => orders ? orders.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Orders.findById(params.id)
    .then(notFound(res))
    .then((orders) => orders ? Object.assign(orders, body).save() : null)
    .then((orders) => orders ? orders.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Orders.findById(params.id)
    .then(notFound(res))
    .then((orders) => orders ? orders.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const createPaymentId = async (req, res) => {
  try {

    let { body } = req

    let razorPayInstance = new Razorpay({ key_id: razorPayKey, key_secret: razorPaySecret })

    let orderData = await razorPayInstance.orders.create(body)

    return res.status(200).json({ success: true, payId: orderData.id })

  } catch (error) {
    console.log('error in creating payment id', error)
    if (res) return res.status(500).json({ error: true, message: error. message })
    else return error
  }
}

export const capturePayment = async (req, res) => {
  try {

    let { body } = req

    if (!body || !body.razorPayId || !body.orderId) return res.status(400).json({ error: true, message: 'Check the payload'})

    let order = await Orders.findById(body.orderId)

    if (!order) return res.status(400).json({ error: true, message: 'Order not found' })

    const url = `https://${razorPayKey}:${razorPaySecret}@api.razorpay.com/v1/payments/${body.razorPayId}/capture`

    body.price = parseInt(body.price)

    const data = {
      amount: body.amount
    }

    const captureObj = await axios.post(url, data);

    console.log('captureObj ====>', captureObj.response.data)

    const capturedData = captureObj.data

    if (capturedData) {

      order.paymentStatus = 1,
      order.paidOn = new Date()

      await order.save()
      
    } else  {

      order.paymentStatus = 2,
      order.paidOn = new Date()

      return res.status(200).json({ error: true, message: capturedData.response.data.error.description })
    } 

  } catch (error) {
    console.log('error in capturing payment', error.response && error.response.data ? error.response.data.error: 'something went wrong')
    if (res) return res.status(500).json({ error: true, message: error. message })
    else return error
  }
}