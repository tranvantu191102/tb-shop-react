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
                    placeholder='Nh???p email...'
                    name="email"
                    id='email'
                    onChange={(e) => handleOnChangeInput(e.target.value, 'email')}
                    onFocus={(e) => handleRequireInput(e.target.value, 'email')}
                    onBlur={(e) => handleRequireInput(e.target.value, 'email')}
                />
                <p className='login__form-item__confirm'>{isShowRequire.email ? 'Tr?????ng n??y l?? b???t bu???c' : ''}</p>
            </div>
            <div className="login__form-item">
                <label htmlFor="password">M???t kh???u</label>
                <input
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder='Nh???p m???t kh???u...'
                    name="password"
                    id='password'
                    onChange={(e) => handleOnChangeInput(e.target.value, 'password')}
                    onFocus={(e) => handleRequireInput(e.target.value, 'password')}
                    onBlur={(e) => handleRequireInput(e.target.value, 'password')}
                />
                <i className={`${!isShowPassword ? 'bx bxs-low-vision' : 'bx bx-show-alt'}`}
                    onClick={handleShowPassword}>

                </i>
                <p className='login__form-item__confirm'>{isShowRequire.password ? 'Tr?????ng n??y l?? b???t bu???c' : ''}</p>
            </div>
            <div className="login__form-item">
                <label htmlFor="password">X??c nh???n m???t kh???u</label>
                <input
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder='Nh???p m???t kh???u...'
                    name="password"
                    id='password'
                    onChange={(e) => handleOnChangeInput(e.target.value, 'confirmPassword')}
                />
                <i className={`${!isShowPassword ? 'bx bxs-low-vision' : 'bx bx-show-alt'}`}
                    onClick={handleShowPassword}>

                </i>
                <p className='login__form-item__confirm'>{!matchPassword ? 'M???t kh???u kh??ng kh???p' : ''}</p>
            </div>
            <div className="login__form-item">
                <label htmlFor="nameDisplay">T??n hi???n th???</label>
                <input
                    type="text"
                    placeholder='Nh???p t??n c???a b???n...'
                    name="nameDisplay"
                    id='nameDisplay'
                    onChange={(e) => handleOnChangeInput(e.target.value, 'nameDisplay')}
                    onFocus={(e) => handleRequireInput(e.target.value, 'nameDisplay')}
                    onBlur={(e) => handleRequireInput(e.target.value, 'nameDisplay')}
                />
                <p className='login__form-item__confirm'>{isShowRequire.nameDisplay ? 'Tr?????ng n??y l?? b???t bu???c' : ''}</p>
            </div>

            <button className="btn btn-submit">????ng k??</button>
        </form>
    )
}

export default Register