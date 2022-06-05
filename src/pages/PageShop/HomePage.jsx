import React, { useState } from 'react'
import Banner from '../../components/Banner/Banner'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import Policy from '../../components/Policy/Policy'
import ListProductHome from '../../components/ListProductHome/ListProductHome'

import Loading from '../../components/Loading/Loading'

import { useSelector } from 'react-redux'

const HomePage = () => {
    const [loading, setLoading] = useState(true)
    // const user = useSelector(state => state.user)
    return (
        <div className='home-page'>
            <Header />
            <Banner auto={true} />

            <div className="home-page__section">
                <Policy />
            </div>
            <div className="home-page__section">
                <h2 className="home-page__section__title">Sản phẩm bán chạy nhất</h2>
                <ListProductHome all={true} setLoading={setLoading} />
            </div>
            <div className="home-page__section">
                <h2 className="home-page__section__title">Sản phẩm dành cho nam</h2>
                <ListProductHome gender={0} setLoading={setLoading} />
            </div>
            <div className="home-page__section">
                <h2 className="home-page__section__title">Sản phẩm dành cho nữ</h2>
                <ListProductHome gender={1} setLoading={setLoading} />
            </div>
            <div className="home-page__section">
                <h2 className="home-page__section__title">Sản phẩm phụ kiện</h2>
                <ListProductHome type='phu-kien' setLoading={setLoading} />
            </div>
            <Footer />
            <Loading loading={loading} />
        </div>
    )
}

export default HomePage