import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import baoHanh1 from '../../assets/images/bao-hanh.jpg'
import baoHanh2 from '../../assets/images/bao-hanh-2.jpg'
import day4 from '../../assets/images/day-4.jpg'
import aoKhoac1 from '../../assets/images/ao-khoac.jpg'
import aoKhoac2 from '../../assets/images/ao-khoac-2.jpg'
import quanJean from '../../assets/images/quan-jean.jpg'

const Policy = () => {
    return (
        <div>
            <Header />
            <div className="policy-main">
                <div className="policy-main__image">
                    <img src={baoHanh1} alt="" />
                    <img src={baoHanh2} alt="" />
                    <img src={day4} alt="" />
                    <img src={aoKhoac1} alt="" />
                    <img src={aoKhoac2} alt="" />
                    <img src={quanJean} alt="" />
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Policy