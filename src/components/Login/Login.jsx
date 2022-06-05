import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/user'

const Login = () => {

    const adminRedux = useSelector(state => state.admin.login.admin)
    const userRedux = useSelector(state => state.user.login.user)
    // const errorLogin = useSelector(state => state.user.login.error)
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const handleOnChangeInput = (value, id) => {
        setUser({ ...user, [id]: value })
    }
    const handleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    const confirmForm = (filed) => {
        for (let i = 0; i < filed.length; i++) {
            if (!user[filed[i]]) {
                return filed[i]
            }
        }
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        const filedErr = confirmForm(['email', 'password'])
        if (filedErr) {
            alert(`${filedErr} là bắt buộc`)
        } else {
            loginUser(user, dispatch, navigate)
        }


    }

    const handleRequireInput = (value, id) => {
        if (!value) {
            setIsShowRequire({ ...isShowRequire, [id]: true })
        } else {
            setIsShowRequire({ ...isShowRequire, [id]: false })
        }
    }

    return (
        <form className="login__form" onSubmit={(e) => handleSubmitLogin(e)}>
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
                <p className='login__form-item__confirm'>
                    {isShowRequire.email ? 'Trường này là bắt buộc' : ''}
                </p>
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
                <p className='login__form-item__confirm'>
                    {isShowRequire.password ? 'Trường này là bắt buộc' : ''}
                </p>
                <i className={`${!isShowPassword ? 'bx bxs-low-vision' : 'bx bx-show-alt'}`}
                    onClick={handleShowPassword}>

                </i>
            </div>

            <button className="btn btn-submit" type='submit' onClick={handleSubmitLogin}
            >
                Đăng nhập
            </button>
        </form>
    )
}

export default Login