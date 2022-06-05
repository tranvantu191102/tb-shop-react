import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import SidebarProduct from '../../components/SlideBarProduct/SidebarProduct'
import ProductList from '../../components/ProductList/ProductList'
import Loading from '../../components/Loading/Loading'
const Product = () => {

    const [select, setSelect] = useState({
        all: true,
        gender: undefined,
        type: undefined
    })
    const [loading, setLoading] = useState(true)

    const handleSelectProduct = (id, type) => {
        if (id === 0) {
            setSelect({
                all: true,
                gender: undefined,
                type: undefined
            })
        } else if (id === 1) {
            setSelect({
                all: false,
                gender: type,
                type: undefined
            })
        } else if (id === 2) {
            setSelect({
                all: false,
                gender: undefined,
                type: type
            })
        }
    }
    return (
        <div className="product-container">
            <Header />
            <div className="product">
                <div className="product__sidebar">
                    <SidebarProduct onClick={handleSelectProduct} />
                </div>
                <div className="product__info">
                    <ProductList
                        all={select.all}
                        type={select.type}
                        gender={select.gender}
                        setLoading={setLoading}
                    />
                    {
                        loading && <Loading loading={loading} />
                    }
                </div>
            </div>
            <Footer />

        </div>
    )
}

export default Product