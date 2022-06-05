import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { logoutUser, addToCart } from '../../api/user'

const Header = () => {
    const header = [
        {
            path: '/',
            display: 'Trang chủ'
        },
        {
            path: '/product',
            display: 'Sản phẩm'
        },
        {
            path: '/accessory',
            display: 'Phụ kiện'
        }, {
            path: '/policy',
            display: 'Chính sách'
        },
    ]

    const dispatch = useDispatch()
    const userRedux = useSelector(state => state.user.login.user)
    const cartRedux = useSelector(state => state.user.cart)
    const [quantityCart, setQuantityCart] = useState(0)
    const { pathname } = useLocation()
    const headerRef = useRef(null)

    useEffect(() => {
        const changeHeader = () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('header__shrink')
            } else {
                headerRef.current.classList.remove('header__shrink')
            }
        }
        window.addEventListener('scroll', changeHeader)

        return () => {
            window.removeEventListener('scroll', changeHeader)
        }
    }, [])

    useEffect(() => {
        let quantity = 0
        if (cartRedux) {
            cartRedux.forEach(item => {
                quantity += item.quantity
            })
            setQuantityCart(quantity)
        }
    }, [cartRedux])

    const handleLogoutUser = () => {
        logoutUser(dispatch)
        addToCart(userRedux._id, { ...userRedux, cart: cartRedux })
    }
    return (
        <header >
            <div className="header__container" ref={headerRef}>
                <ul className="header__menu__left">
                    {
                        header.map((item, index) => (
                            <li key={index} className={`${pathname === item.path ? 'active' : ''}`}>
                                <Link to={item.path}>{item.display}</Link>
                            </li>
                        ))
                    }
                </ul>
                <div className="header__logo">
                    <h2 className="logo"><a href="/">TB-Shop</a></h2>
                </div>
                <div className="header__menu__right">
                    <div className="header__menu__right__item">
                        <i className='bx bx-search-alt-2'></i>
                    </div>
                    <div className="header__menu__right__item">
                        <div className="header__menu__right__item__cart">
                            <Link to='/cart'><i className='bx bx-cart' ></i></Link>
                            <span className="header__menu__right__item__cart__quantity">{quantityCart}</span>
                        </div>
                    </div>
                    <div className="header__menu__right__item">
                        {
                            userRedux ?
                                <div className="header__menu__right__item__user">
                                    <Link to='/profile'> <i className='bx bx-user-circle' ></i></Link>
                                    <button
                                        className="btn btn-logout"
                                        onClick={handleLogoutUser}
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                                :
                                <button className="btn btn-login"><Link to='/login'>Đăng nhập</Link></button>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header