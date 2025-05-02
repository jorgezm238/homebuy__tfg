import { post } from "./services"

const cartUrl = '/cart'

export async function createCart(cart) {
    try {
        const response = await post(cartUrl, cart, true)
        return response
    } catch (error) {
        throw(error)
    }
}
