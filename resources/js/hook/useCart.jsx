import { useContext } from 'react'
import { CartContext } from '../context/cart';

export function useCart() {
    const { cart, addProductCart, removeProductCart, decreaseAmount, cleanCart } = useContext(CartContext)

    const getTotalPriceCart = (products) => {
        let totalPriceCart = 0
        products.forEach(product => {
            const [PRICE, COUNT] = product.price_product === undefined ? [
                'price',
                'count'
            ] : [
                'price_product',
                'count_product'
            ]

            return totalPriceCart += (product[PRICE]) * product[COUNT]
        })

        return totalPriceCart.toFixed(2)
    }

    const hasProduct = (product) => (
        cart.products.some(item => item.id_product === product.id_product)
    )

    return {
        addProductCart,
        removeProductCart,
        cleanCart,
        hasProduct,
        decreaseAmount,
        cart,
        getTotalPriceCart
    }
}
