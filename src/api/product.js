import axios from 'axios';


const urlAPI = 'http://localhost:8080'

const addProductApi = async (product) => {
    try {
        const res = await axios.post(`${urlAPI}/api/product/add-product`, product)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

const listProductApi = async (limit) => {
    try {
        const res = await axios.get(`${urlAPI}/api/product/get-products/${limit}`)

        if (res) {
            return res.data
        }

    } catch (error) {
        console.log(error)
    }
}

const getProductApi = async (id) => {
    try {
        return await axios.get(`${urlAPI}/api/product/get-product-by-id/${id}`)
    } catch (error) {
        console.log(error)
    }
}

const editProductApi = async (id, product) => {
    try {
        return await axios.put(`${urlAPI}/api/product/edit-product/${id}`, product)
    } catch (error) {
        console.log(error)
    }
}


const deleteProductApi = async (id) => {
    try {
        return await axios.delete(`${urlAPI}/api/product/delete-product/${id}`)

    } catch (error) {
        console.log(error)
    }
}

const getProductsByGenderApi = async (id) => {
    try {
        return await axios.get(`${urlAPI}/api/product/get-products-by-gender/${id}`)

    } catch (error) {
        console.log(error)
    }
}

const getProductsByTypeApi = async (id) => {
    try {
        return await axios.get(`${urlAPI}/api/product/get-products-by-type/${id}`)

    } catch (error) {
        console.log(error)
    }
}


export {
    addProductApi,
    listProductApi,
    deleteProductApi,
    getProductApi,
    editProductApi,
    getProductsByGenderApi,
    getProductsByTypeApi
}