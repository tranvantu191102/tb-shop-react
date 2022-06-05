import { createSlice, current } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        login: {
            loading: false,
            user: null,
            error: false
        },
        register: {
            loading: false,
            error: false
        },
        cart: []
    },
    reducers: {
        loginUserStart: (state) => {
            state.login.loading = true
        },
        loginUserSuccess: (state, action) => {
            state.login.loading = false
            state.login.user = action.payload
            state.cart = action.payload.cart
        },
        loginUserFailed: (state) => {
            state.login.loading = false
            state.login.error = true
        },
        registerUserStart: (state) => {
            state.register.loading = true
        },
        registerUserSuccess: (state, action) => {
            state.register.loading = false
            state.login.user = action.payload
        },
        registerUserFailed: (state) => {
            state.register.loading = false
            state.register.error = true
        },
        logout: (state) => {
            state.login.user = null
            state.cart = []
        },
        addToCartRedux: (state, action) => {
            console.log('payload', action.payload)
            const newItem = action.payload
            let cartCopy = [...state.cart]
            // state.cart = []
            let itemExist = []
            if (state.cart.length > 0) {
                itemExist = cartCopy.filter(item => item.id === newItem.id && item.size === newItem.size)
                // console.log('exist', itemExist)
                if (itemExist.length > 0) {
                    cartCopy = cartCopy.filter(item => item.id !== newItem.id || item.size !== newItem.size)

                    console.log('state cart', current(state.cart))
                    state.cart = [...cartCopy, {
                        ...newItem,
                        quantity: itemExist[0].quantity + newItem.quantity
                    }]
                } else {
                    console.log('state cart', current(state.cart))
                    state.cart.push(newItem)
                }
            } else {
                console.log('state cart', current(state.cart))
                state.cart.push(newItem)
            }
            console.log('state', current(state))
        },
        deleteCartRedux: (state, action) => {
            const item = action.payload

            let cartCopy = [...state.cart]
            cartCopy = cartCopy.filter(e => e.id !== item.id || e.size !== item.size)
            state.cart = cartCopy
        },
        updateCartRedux: (state, action) => {
            const item = action.payload
            let cartCopy = [...state.cart]
            let itemExist = []

            itemExist = cartCopy.filter(e => e.id === item.id && e.size === item.size)
            if (itemExist.length > 0) {
                // cartCopy = cartCopy.filter(e => e.id !== item.id || e.size !== item.size)
                const index = cartCopy.findIndex(e => e.id === item.id && e.size === item.size)
                cartCopy[index] = item
                state.cart = [...cartCopy]
            }
        },
        updateUserLogin: (state, action) => {
            state.login.user = action.payload
        }

    }
})

export const {
    loginUserFailed,
    loginUserStart,
    loginUserSuccess,
    registerUserFailed,
    registerUserStart,
    registerUserSuccess,
    logout,
    addToCartRedux,
    deleteCartRedux,
    updateCartRedux,
    updateUserLogin
} = userSlice.actions

export default userSlice.reducer