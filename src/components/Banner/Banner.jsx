import React, { useState, useEffect, useCallback } from 'react'
import image1 from '../../assets/images/banner-1.jpg'
import image2 from '../../assets/images/banner-2.jpg'
import image3 from '../../assets/images/banner-3.jpg'
const Banner = (props) => {

    const banners = [
        {
            id: 1,
            image: image1
        },
        {
            id: 2,
            image: image2
        },
        {
            id: 3,
            image: image3
        },
    ]
    const auto = props.auto ? props.auto : false
    const timeOut = props.timeOut ? props.timeOut : 10000
    const [activeSlide, setActiveSlide] = useState(0)

    const nextSlide = useCallback(() => {
        const index = activeSlide === banners.length - 1 ? 0 : activeSlide + 1
        setActiveSlide(index)
    }, [activeSlide])

    const prevSlide = () => {
        const index = activeSlide === 0 ? banners.length - 1 : activeSlide - 1
        setActiveSlide(index)
    }

    useEffect(() => {
        if (auto) {
            const slideAuto = setInterval(() => {
                nextSlide()
            }, timeOut)
            return () => {
                clearInterval(slideAuto)
            }
        }
    }, [nextSlide, timeOut, auto])


    return (
        <div className="banner">
            <div className="banner__container">
                <div className="banner__slide">
                    <BannerItem data={banners[activeSlide]} />
                </div>
                <div className="banner__control">
                    <div className="banner__control__left" onClick={prevSlide}>
                        <i className='bx bxs-left-arrow'></i>
                    </div>
                    <div className="banner__control__number">
                        <span>{activeSlide + 1}/{banners.length}</span>
                    </div>
                    <div className="banner__control__right" onClick={nextSlide}>
                        <i className='bx bxs-right-arrow'></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

const BannerItem = (props) => {
    const { data } = props
    return (
        <div className="banner__slide__item">
            <img src={data.image} alt="" />
        </div>
    )
}

export default Banner