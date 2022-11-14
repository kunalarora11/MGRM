import { Orders } from '.'

let orders

beforeEach(async () => {
  orders = await Orders.create({ productId: 'test', userId: 'test', orderDate: 'test', paymentStatus: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = orders.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(orders.id)
    expect(view.productId).toBe(orders.productId)
    expect(view.userId).toBe(orders.userId)
    expect(view.orderDate).toBe(orders.orderDate)
    expect(view.paymentStatus).toBe(orders.paymentStatus)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = orders.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(orders.id)
    expect(view.productId).toBe(orders.productId)
    expect(view.userId).toBe(orders.userId)
    expect(view.orderDate).toBe(orders.orderDate)
    expect(view.paymentStatus).toBe(orders.paymentStatus)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
