import axios from "axios"
import {
    loginUserStart,
    loginUserFailed,
    loginUserSuccess,
    registerUserFailed,
    registerUserStart,
    registerUserSuccess,
    logout,
    addToCartRedux

} from '../redux/userSlice'
const urlAPI = 'http://localhost:8080'

const loginUser = async (user, dispath, navigate) => {
    dispath(loginUserStart())

    try {
        const res = await axios.post(`${urlAPI}/api/user/login`, user)
        if (res) {
            dispath(loginUserSuccess(res.data.user))
            navigate('/')
        }
    } catch (error) {
        console.log(error);
        dispath(loginUserFailed())
    }
}

const registerUser = async (user, dispath, navigate) => {
    dispath(registerUserStart())
    try {
        const res = await axios.post(`${urlAPI}/api/user/register-user`, user)
        if (res) {
            console.log(res)
            dispath(registerUserSuccess(res.data))
            navigate('/')
        }
    } catch (error) {
        console.log(error)
        dispath(registerUserFailed())
    }
}

const logoutUser = (dispath) => {
    try {
        dispath(logout())
    } catch (error) {
        console.log(error)
    }
}

const addToCart = async (id, data) => {
    try {
        return await axios.post(`${urlAPI}/api/user/add-to-cart/${id}`, data)
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (id, data) => {
    try {
        return await axios.put(`${urlAPI}/api/user/update-user/${id}`, data)
    } catch (error) {
        console.log(error)
    }
}

export {
    loginUser,
    logoutUser,
    registerUser,
    addToCart,
    updateUser
}