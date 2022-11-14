import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, capturePayment, createPaymentId } from './controller'
import { schema } from './model'
export Orders, { schema } from './model'

const router = new Router()
const { productId, userId, orderDate, paymentStatus } = schema.tree

/**
 * @api {post} /orders Create orders
 * @apiName CreateOrders
 * @apiGroup Orders
 * @apiParam productId Orders's productId.
 * @apiParam userId Orders's userId.
 * @apiParam orderDate Orders's orderDate.
 * @apiParam paymentStatus Orders's paymentStatus.
 * @apiSuccess {Object} orders Orders's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Orders not found.
 */
router.post('/',
  // body({ productId, userId, orderDate, paymentStatus }),
  create)

/**
 * @api {get} /orders Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Orders
 * @apiUse listParams
 * @apiSuccess {Object[]} orders List of orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /orders/:id Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Orders
 * @apiSuccess {Object} orders Orders's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Orders not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /orders/:id Update orders
 * @apiName UpdateOrders
 * @apiGroup Orders
 * @apiParam productId Orders's productId.
 * @apiParam userId Orders's userId.
 * @apiParam orderDate Orders's orderDate.
 * @apiParam paymentStatus Orders's paymentStatus.
 * @apiSuccess {Object} orders Orders's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Orders not found.
 */
router.put('/:id',
  body({ productId, userId, orderDate, paymentStatus }),
  update)

/**
 * @api {delete} /orders/:id Delete orders
 * @apiName DeleteOrders
 * @apiGroup Orders
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Orders not found.
 */
router.delete('/:id',
  destroy)

router.post('/capturePayment', capturePayment)

router.post('/createPaymentId', createPaymentId)

export default router
