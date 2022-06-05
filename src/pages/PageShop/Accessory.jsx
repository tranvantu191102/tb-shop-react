import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { getProductsByTypeApi } from '../../api/product'
import ProductItem from '../../components/ProductItem/ProductItem'
import Loading from '../../components/Loading/Loading'
const Accessory = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            const res = await getProductsByTypeApi('phu-kien')
            if (res) {
                setProducts(res.data.products)
                setLoading(false)
            }
        }
        getProduct()
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className="accessory-container" >
            <Header />
            <div className="accessory">
                <h2 className="accessory__title">Phụ kiện</h2>
                <div className="row">
                    {
                        products && products.length > 0 &&
                        products.map((item, index) => (
                            <div className="col-3" key={index}>
                                <ProductItem data={item} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />
            <Loading loading={loading} />
        </div>
    )
}

export default Accessory