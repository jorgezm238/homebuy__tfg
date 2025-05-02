import Storage from "../services/storage";

export const cartInitialState = Storage.get('cart') || {
    status: 'ESPERA',
    products: [],
    user: null
}

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_PRODUCT_CART: 'REMOVE_PRODUCT_CART',
    DECREASE_AMOUNT: 'DECREASE_AMOUNT',
    CLEAN_CART: 'CLEAN_CART',
    SET_USER_CART: 'SET_USER_CART'
}

const findIndexProduct = (cart, product) => (
    cart.products.findIndex(item => item.id_product === product.id_product)
)

const UPDATE_STATE_BY_ACTION = {
    [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
        const productInCartIndex = findIndexProduct(state, action.payload)

        if (productInCartIndex >= 0) {
            const newCart = structuredClone(state)
            newCart.products[productInCartIndex].count += 1

            Storage.set('cart', newCart)

            return newCart
        }

        const newCart = {
            ...state,
            products: [...state.products, {...action.payload, count: 1}]
        }

        Storage.set('cart', newCart)
        return newCart
    },

    [CART_ACTION_TYPES.REMOVE_PRODUCT_CART]: (state, action) => {
        const newCart = {
            ...state,
            products: state.products.filter(product => product.id_product !== action.payload.id_product)
        }

        Storage.set('cart', newCart)

        return newCart
    },

    [CART_ACTION_TYPES.DECREASE_AMOUNT]: (state, action) => {
        const productInCartIndex = findIndexProduct(state, action.payload)
        if (productInCartIndex >= 0) {
            const newCart = structuredClone(state)
            newCart.products[productInCartIndex].count -= newCart.products[productInCartIndex].count > 1 ? 1 : 0

            Storage.set('cart', newCart)
            return newCart
        }
    },

    [CART_ACTION_TYPES.CLEAN_CART]: (state, action) => {
        const newCart = {
            ...state,
            products: []
        }

        Storage.set('cart', newCart)
        return newCart
    },

    [CART_ACTION_TYPES.SET_USER_CART]: (state, action) => {
        const newCart = {
            ...state,
            user: action.payload
        }

        Storage.set('cart', newCart)
        return newCart
    }
}

export const cartReducer = (state, action) => {
    const { type: actionType } = action
    const updateState = UPDATE_STATE_BY_ACTION[actionType]
    return updateState ? updateState(state, action) : state
    return state
}
