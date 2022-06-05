import React, { useState } from 'react'

import logo from '../../assets/images/shop.png'

import Login from './Login'
import Register from './Register'
const Form = () => {

    const [isLogin, setisLogin] = useState(true)


    const handleOptions = (option) => {
        option === 'login' ? setisLogin(true) : setisLogin(false)
    }
    return (

        <div className="container">
            <div className="wrapper">
                <div className="login">

                    <div className="login__header">
                        <div className="login__logo">
                            <img className='login__logo__img' src={logo} alt="" />
                            <h3 className="login__logo__name">TB-SHOP</h3>
                        </div>
                        <div className="login__btn">
                            <button
                                className={`btn btn-login ${isLogin ? 'active' : ''}`}
                                onClick={() => handleOptions('login')}
                            >
                                Đăng nhập
                            </button>
                            <button
                                className={`btn btn-register ${!isLogin ? 'active' : ''}`}
                                onClick={() => handleOptions('register')}
                            >
                                Đăng ký
                            </button>
                        </div>
                    </div>
                    {
                        isLogin ? <Login /> : <Register />
                    }
                </div>
            </div>
        </div>

    )
}

export default Form