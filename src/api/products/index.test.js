import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Products } from '.'

const app = () => express(apiRoot, routes)

let products

beforeEach(async () => {
  products = await Products.create({})
})

test('POST /products 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ productName: 'test', sku: 'test', price: 'test', quantity: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.productName).toEqual('test')
  expect(body.sku).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.quantity).toEqual('test')
})

test('GET /products 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /products/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${products.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(products.id)
})

test('GET /products/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /products/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${products.id}`)
    .send({ productName: 'test', sku: 'test', price: 'test', quantity: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(products.id)
  expect(body.productName).toEqual('test')
  expect(body.sku).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.quantity).toEqual('test')
})

test('PUT /products/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ productName: 'test', sku: 'test', price: 'test', quantity: 'test' })
  expect(status).toBe(404)
})

test('DELETE /products/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${products.id}`)
  expect(status).toBe(204)
})

test('DELETE /products/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
