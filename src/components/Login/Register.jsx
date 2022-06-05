import React, { useState } from 'react'

import { registerUser } from '../../api/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [isShowPassword, setIsShowPassword] = useState(false)
    const [matchPassword, setMatchPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isShowRequire, setIsShowRequire] = useState({
        email: false,
        password: false
    })

    const [user, setUser] = useState({
        email: '',
        password: '',
        nameDisplay: ''
    })

    const handleOnChangeInput = (value, id) => {
        if (id === 'confirmPassword') {
            if (!value) {
                setMatchPassword(false)
                return
            } else {
                setMatchPassword(user.password === value)
                return
            }
        }

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
        const filedErr = confirmForm(['email', 'password', 'nameDisplay'])
        if (filedErr) {
            alert(filedErr + 'required')
        } else {
            registerUser(user, dispatch, navigate)
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
                <p className='login__form-item__confirm'>{isShowRequire.email ? 'Trường này là bắt buộc' : ''}</p>
            </div>
            <div className="login__form-item">
                <label htmlFor="password">Mật khẩu</label>
                <input
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder='Nhập mật khẩu...'
                    name="password"
                    id='password'
                    onChange={(e) => handleOnChangeInput(e.target.value, 'password')}
                    onFocus={(e) => handleRequireInput(e.target.value, 'password')}
                    onBlur={(e) => handleRequireInput(e.target.value, 'password')}
                />
                <i className={`${!isShowPassword ? 'bx bxs-low-vision' : 'bx bx-show-alt'}`}
                    onClick={handleShowPassword}>

                </i>
                <p className='login__form-item__confirm'>{isShowRequire.password ? 'Trường này là bắt buộc' : ''}</p>
            </div>
            <div className="login__form-item">
                <label htmlFor="password">Xác nhận mật khẩu</label>
                <input
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder='Nhập mật khẩu...'
                    name="password"
                    id='password'
                    onChange={(e) => handleOnChangeInput(e.target.value, 'confirmPassword')}
                />
                <i className={`${!isShowPassword ? 'bx bxs-low-vision' : 'bx bx-show-alt'}`}
                    onClick={handleShowPassword}>

                </i>
                <p className='login__form-item__confirm'>{!matchPassword ? 'Mật khẩu không khớp' : ''}</p>
            </div>
            <div className="login__form-item">
                <label htmlFor="nameDisplay">Tên hiển thị</label>
                <input
                    type="text"
                    placeholder='Nhập tên của bạn...'
                    name="nameDisplay"
                    id='nameDisplay'
                    onChange={(e) => handleOnChangeInput(e.target.value, 'nameDisplay')}
                    onFocus={(e) => handleRequireInput(e.target.value, 'nameDisplay')}
                    onBlur={(e) => handleRequireInput(e.target.value, 'nameDisplay')}
                />
                <p className='login__form-item__confirm'>{isShowRequire.nameDisplay ? 'Trường này là bắt buộc' : ''}</p>
            </div>

            <button className="btn btn-submit">Đăng ký</button>
        </form>
    )
}

export default Register