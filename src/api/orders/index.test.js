import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Orders } from '.'

const app = () => express(apiRoot, routes)

let orders

beforeEach(async () => {
  orders = await Orders.create({})
})

test('POST /orders 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ productId: 'test', userId: 'test', orderDate: 'test', paymentStatus: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.productId).toEqual('test')
  expect(body.userId).toEqual('test')
  expect(body.orderDate).toEqual('test')
  expect(body.paymentStatus).toEqual('test')
})

test('GET /orders 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /orders/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${orders.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(orders.id)
})

test('GET /orders/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /orders/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${orders.id}`)
    .send({ productId: 'test', userId: 'test', orderDate: 'test', paymentStatus: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(orders.id)
  expect(body.productId).toEqual('test')
  expect(body.userId).toEqual('test')
  expect(body.orderDate).toEqual('test')
  expect(body.paymentStatus).toEqual('test')
})

test('PUT /orders/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ productId: 'test', userId: 'test', orderDate: 'test', paymentStatus: 'test' })
  expect(status).toBe(404)
})

test('DELETE /orders/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${orders.id}`)
  expect(status).toBe(204)
})

test('DELETE /orders/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
