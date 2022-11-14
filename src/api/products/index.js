import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Products, { schema } from './model'

const router = new Router()
const { productName, sku, price, quantity } = schema.tree

/**
 * @api {post} /products Create products
 * @apiName CreateProducts
 * @apiGroup Products
 * @apiParam productName Products's productName.
 * @apiParam sku Products's sku.
 * @apiParam price Products's price.
 * @apiParam quantity Products's quantity.
 * @apiSuccess {Object} products Products's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Products not found.
 */
router.post('/',
  body({ productName, sku, price, quantity }),
  create)

/**
 * @api {get} /products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Products
 * @apiUse listParams
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /products/:id Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Products
 * @apiSuccess {Object} products Products's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Products not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /products/:id Update products
 * @apiName UpdateProducts
 * @apiGroup Products
 * @apiParam productName Products's productName.
 * @apiParam sku Products's sku.
 * @apiParam price Products's price.
 * @apiParam quantity Products's quantity.
 * @apiSuccess {Object} products Products's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Products not found.
 */
router.put('/:id',
  body({ productName, sku, price, quantity }),
  update)

/**
 * @api {delete} /products/:id Delete products
 * @apiName DeleteProducts
 * @apiGroup Products
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Products not found.
 */
router.delete('/:id',
  destroy)

export default router
