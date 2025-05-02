import { createContext, useReducer, useEffect } from 'react'
import { cartInitialState, cartReducer } from '../reducers/cart'
import Storage from '../services/storage'

export const CartContext = createContext()

function useCartReducer() {
    const [cart, dispatch] = useReducer(cartReducer, cartInitialState)

    const addProductCart = (product) => (
        dispatch({
            type: 'ADD_TO_CART',
            payload: product
        })
    )

    const removeProductCart = (product) => (
        dispatch({
            type: 'REMOVE_PRODUCT_CART',
            payload: product
        })
    )

    const decreaseAmount = (product) => (
        dispatch({
            type: 'DECREASE_AMOUNT',
            payload: product
        })
    )

    const cleanCart = () => (
        dispatch({
            type: 'CLEAN_CART'
        })
    )

    const setUserCart = (user) => (
        dispatch({
            type: 'SET_USER_CART',
            payload: user
        })
    )

    return {
        cart,
        addProductCart,
        removeProductCart,
        decreaseAmount,
        cleanCart,
        setUserCart
    }
}

export function CartProvider({ children }) {
    const cartReducer = useCartReducer()

    useEffect(() => {
        const user = Storage.get('user') || null
        cartReducer.setUserCart(user)
    }, [])

    return (
        <CartContext.Provider value={cartReducer}>
            {children}
        </CartContext.Provider>
    )
}
