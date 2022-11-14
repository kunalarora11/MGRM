import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Users } from '.'

const app = () => express(apiRoot, routes)

let users

beforeEach(async () => {
  users = await Users.create({})
})

test('POST /users 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ fullName: 'test', email: 'test', address: 'test', country: 'test', state: 'test', city: 'test', pinCode: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.fullName).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.state).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.pinCode).toEqual('test')
})

test('GET /users 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /users/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${users.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(users.id)
})

test('GET /users/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /users/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${users.id}`)
    .send({ fullName: 'test', email: 'test', address: 'test', country: 'test', state: 'test', city: 'test', pinCode: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(users.id)
  expect(body.fullName).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.state).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.pinCode).toEqual('test')
})

test('PUT /users/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ fullName: 'test', email: 'test', address: 'test', country: 'test', state: 'test', city: 'test', pinCode: 'test' })
  expect(status).toBe(404)
})

test('DELETE /users/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${users.id}`)
  expect(status).toBe(204)
})

test('DELETE /users/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
