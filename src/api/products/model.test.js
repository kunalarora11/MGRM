import { Products } from '.'

let products

beforeEach(async () => {
  products = await Products.create({ productName: 'test', sku: 'test', price: 'test', quantity: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = products.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(products.id)
    expect(view.productName).toBe(products.productName)
    expect(view.sku).toBe(products.sku)
    expect(view.price).toBe(products.price)
    expect(view.quantity).toBe(products.quantity)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = products.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(products.id)
    expect(view.productName).toBe(products.productName)
    expect(view.sku).toBe(products.sku)
    expect(view.price).toBe(products.price)
    expect(view.quantity).toBe(products.quantity)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
