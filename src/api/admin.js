import axios from 'axios';
import {
    loginStart,
    loginSuccess,
    loginFalied,
    getAdminStart,
    getAdminSuccess,
    getAdminFailed,
    logout
} from '../redux/adminSlice';



const urlAPI = 'http://localhost:8080'

const adminLogin = async (admin, dispath, navigate) => {
    dispath(loginStart())
    try {
        const res = await axios.post(`${urlAPI}/api/login`, admin)
        console.log('res', res)
        if (res) {
            dispath(loginSuccess(res.data.user._doc))
        }
        navigate('/admin')
    } catch (error) {
        console.log(error)
        dispath(loginFalied())
    }
}

const adminLogout = async (dispath) => {
    try {
        dispath(logout())
    } catch (error) {
        console.log(error)
    }
}

const getAdmin = async (dispath) => {
    dispath(getAdminStart())
    try {
        const res = await axios.get(`${urlAPI}/api/admin/get-all-admins`)
        if (res) {
            dispath(getAdminSuccess(res.data.admins))
            return res.data.admins
        }
    } catch (error) {
        console.log(error)
        dispath(getAdminFailed())
    }
}

const addAdmin = async (admin) => {
    try {

        const res = await axios.post(`${urlAPI}/api/admin/create-admin`, admin)

    } catch (error) {
        console.log(error)
    }
}

const getAdminById = async (id) => {
    try {

        const res = await axios.get(`${urlAPI}/api/admin/get-admin-by-id/${id}`)
        return res.data

    } catch (error) {
        console.log(error)
    }
}

const editAdmin = async (admin, id) => {
    try {

        const res = await axios.put(`${urlAPI}/api/admin/edit-admin/${id}`, admin)
        console.log('res', res)

    } catch (error) {
        console.log(error)
    }
}


const deleteAdmin = async (id) => {
    try {
        await axios.delete(`${urlAPI}/api/admin/delete-admin/${id}`)
    } catch (error) {
        console.log(error)
    }
}


export {
    adminLogin,
    getAdmin,
    adminLogout,
    addAdmin,
    getAdminById,
    editAdmin,
    deleteAdmin
} 