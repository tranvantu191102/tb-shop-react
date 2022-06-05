import React, { useState, useEffect } from 'react'
import { listProductApi, getProductsByGenderApi, getProductsByTypeApi } from '../../api/product'
import ProductItem from '../ProductItem/ProductItem'
import Pagination from '../Pagination/Pagination'
const ProductList = (props) => {
    const [products, setProducts] = useState([])
    const [productsRender, setProductsRender] = useState([])
    const [indexPage, setIndexPage] = useState(0)

    const setLoading = props.setLoading

    const all = props.all ? true : false
    const gender = props.gender ? props.gender : null
    const type = props.type ? props.type : null

    useEffect(() => {
        const getProducts = async () => {
            let res
            setLoading(true)
            try {
                if (all) {
                    res = await listProductApi('all')
                    if (res) {
                        setProducts(res.products)
                        setLoading(false)
                    }
                } else if (type) {
                    res = await getProductsByTypeApi(type)
                    if (res) {
                        setProducts(res.data.products)
                        setLoading(false)
                    }
                } else if (gender) {
                    res = await getProductsByGenderApi(gender)
                    if (res) {
                        setProducts(res.data.products)
                        setLoading(false)
                    }
                }
            } catch (error) {
                console.log(error)
            }

        }

        getProducts()
        window.scrollTo(0, 0)
    }, [all, gender, type])

    useEffect(() => {
        const start = indexPage * 20
        const end = products.length - start > 20 ? start + 20 : products.length
        setProductsRender(products.slice(start, end))
        window.scrollTo(0, 0)
    }, [products, indexPage])


    const handleSetProductsRender = (index) => {
        setIndexPage(index)
    }

    return (
        <div className="product-list">
            <div className="row">
                {
                    productsRender && productsRender.length > 0
                    && productsRender.map((item, index) => (
                        <div className="col-3" key={index}>
                            <ProductItem data={item} />
                        </div>
                    ))
                }
            </div>
            <Pagination length={products.length} handleSetProductsRender={handleSetProductsRender} />
        </div>
    )
}

export default ProductList