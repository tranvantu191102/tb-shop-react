import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getProductsByGenderApi, listProductApi, getProductsByTypeApi } from '../../api/product'
import ProductItem from '../ProductItem/ProductItem'

const ListProductHome = (props) => {

    const [products, setProducts] = useState([])

    const gender = props.gender
    const type = props.type ? props.type : null
    const all = props.all ? props.all : null
    const setLoading = props.setLoading

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            if (gender === 0 || gender === 1) {
                const res = await getProductsByGenderApi(gender)
                if (res) {
                    setProducts(res.data.products.slice(0, 4))
                    setLoading(false)
                }
            }
            if (all) {
                const res = await listProductApi(12)
                if (res) {
                    setProducts(res.products)
                    setLoading(false)
                }
            }
            if (type) {
                const res = await getProductsByTypeApi(type)
                if (res) {
                    setProducts(res.data.products.slice(0, 4))
                    setLoading(false)
                }
            }
        }
        getProducts()
    }, [])



    return (
        <div className='list-products-home'>
            <div className="row">
                {
                    products && products.length > 0
                    && products.map((item, index) => (
                        <div className="col-3" key={index}>
                            <ProductItem data={item} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListProductHome