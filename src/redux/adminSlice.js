import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        listAdmin: {
            loading: false,
            listAdmin: null,
        },
        login: {
            loading: false,
            admin: null
        },

    },
    reducers: {
        loginStart: (state) => {
            state.login.loading = true;
        },
        loginSuccess: (state, action) => {
            state.login.admin = action.payload;
            state.login.loading = false;
        },
        loginFalied: (state) => {
            state.login.loading = false;
        },
        logout: (state) => {
            state.login.admin = null;
        },
        getAdminStart: (state) => {
            state.listAdmin.loading = true;
        },
        getAdminSuccess: (state, action) => {
            state.listAdmin.listAdmin = action.payload;
            state.listAdmin.loading = false;
        },
        getAdminFailed: (state) => {
            state.listAdmin.loading = false;
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFalied,
    getAdminStart,
    getAdminSuccess,
    getAdminFailed,
    logout,
} = adminSlice.actions

export default adminSlice.reducer