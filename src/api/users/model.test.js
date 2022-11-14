import { Users } from '.'

let users

beforeEach(async () => {
  users = await Users.create({ fullName: 'test', email: 'test', address: 'test', country: 'test', state: 'test', city: 'test', pinCode: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = users.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(users.id)
    expect(view.fullName).toBe(users.fullName)
    expect(view.email).toBe(users.email)
    expect(view.address).toBe(users.address)
    expect(view.country).toBe(users.country)
    expect(view.state).toBe(users.state)
    expect(view.city).toBe(users.city)
    expect(view.pinCode).toBe(users.pinCode)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = users.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(users.id)
    expect(view.fullName).toBe(users.fullName)
    expect(view.email).toBe(users.email)
    expect(view.address).toBe(users.address)
    expect(view.country).toBe(users.country)
    expect(view.state).toBe(users.state)
    expect(view.city).toBe(users.city)
    expect(view.pinCode).toBe(users.pinCode)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
