import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { adminLogin } from '../../api/admin';

const AdminLogin = () => {

    const adminRedux = useSelector(state => state.admin.login.admin)
    const userRedux = useSelector(state => state.user.login.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (adminRedux) {
            navigate('/admin')
        }

        if (userRedux) {
            navigate('/')
        }
    }, [])

    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowRequire, setIsShowRequire] = useState({
        email: false,
        password: false
    })
    const [admin, setAdmin] = useState({
        email: '',
        password: ''
    })



    const handleOnChangeInput = (value, id) => {
        setAdmin({ ...admin, [id]: value })
    }
    const handleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    const confirmForm = (filed) => {
        for (let i = 0; i < filed.length; i++) {
            if (!admin[filed[i]]) {
                return filed[i]
            }
        }
    }


    const handleSubmitLogin = (e) => {
        e.preventDefault()
        const filedErr = confirmForm(['email', 'password'])
        if (filedErr) {
            alert(filedErr)
        }
        adminLogin({
            email: admin.email,
            password: admin.password
        }, dispatch, navigate)

        navigate('/admin')
    }

    const handleRequireInput = (value, id) => {
        if (!value) {
            setIsShowRequire({ ...isShowRequire, [id]: true })
        } else {
            setIsShowRequire({ ...isShowRequire, [id]: false })
        }
    }

    return (
        <div className="admin-container">
            <div className="admin-login">
                <h3 className='admin-login-title'>Đăng nhập cho admin</h3>
                <form className="login__form" action="" onSubmit={(e) => handleSubmitLogin(e)}>
                    <div className="login__form-item">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder='Nhập email...'
                            name="email"
                            id='email'
                            onChange={(e) => handleOnChangeInput(e.target.value, 'email')}
                            onFocus={(e) => handleRequireInput(e.target.value, 'email')}
                            onBlur={(e) => handleRequireInput(e.target.value, 'email')}
                        />
                        <p className='login__form-item__confirm'>{isShowRequire.email ? 'Trường này là bắt buộc' : ''}</p>
                    </div>
                    <div className="login__form-item">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type={`${isShowPassword ? 'text' : 'password'}`}
                            placeholder='Nhập mật khẩu...'
                            name="password"
                            id='password'
                            onChange={(e) => handleOnChangeInput(e.target.value, 'password')}
                            onFocus={(e) => handleRequireInput(e.target.value, 'password')}
                            onBlur={(e) => handleRequireInput(e.target.value, 'password')}
                        />
                        <p className='login__form-item__confirm'>{isShowRequire.password ? 'Trường này là bắt buộc' : ''}</p>
                        <i className={`${!isShowPassword ? 'bx bxs-low-vision' : 'bx bx-show-alt'}`}
                            onClick={handleShowPassword}>

                        </i>
                    </div>

                    <button className="btn btn-submit"
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin