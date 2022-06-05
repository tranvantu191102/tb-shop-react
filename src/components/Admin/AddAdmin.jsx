import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HeaderAdmin from './HeaderAdmin'
import { addAdmin } from '../../api/admin'
const AddAdmin = () => {


    const adminLogin = useSelector(state => state.admin.login.admin)
    const navigate = useNavigate()
    useEffect(() => {
        if (!adminLogin) {
            navigate('/admin/login')
        }
    }, [adminLogin])

    const [admin, setAdmin] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nameDisplay: ''
    })


    const confirmForm = (filed) => {
        for (let i = 0; i < filed.length; i++) {
            if (!admin[filed[i]]) {
                return filed[i]
            }
        }
    }

    const handleOnchangeInput = (value, id) => {
        setAdmin({ ...admin, [id]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const fieldEmpty = confirmForm(['email', 'password', 'confirmPassword', 'nameDisplay'])
        if (fieldEmpty) {
            return alert(fieldEmpty)
        }
        if (admin.password !== admin.confirmPassword) {
            return alert('Mật khẩu chưa đúng!')
        }
        addAdmin({
            email: admin.email,
            password: admin.password,
            nameDisplay: admin.nameDisplay
        })

        setAdmin({
            email: '',
            password: '',
            confirmPassword: '',
            nameDisplay: ''
        })
        alert('Thêm admin thành công')
    }


    return (
        <div>
            <HeaderAdmin />
            <div className="add-admin-container">
                <form action="">
                    <div className="form-group-item">
                        <label >Email</label>
                        <input
                            type="email"
                            name='email'
                            value={admin.email}
                            placeholder='Nhập email...'
                            onChange={(e) => handleOnchangeInput(e.target.value, 'email')}
                        />
                    </div>
                    <div className="form-group-item">
                        <label >Password</label>
                        <input
                            type="password"
                            name='password'
                            value={admin.password}
                            placeholder='Nhập password...'
                            onChange={(e) => handleOnchangeInput(e.target.value, 'password')}
                        />
                    </div>
                    <div className="form-group-item">
                        <label >Xác nhận password</label>
                        <input
                            type="password"
                            name='confirmPassword'
                            value={admin.confirmPassword}
                            placeholder='Nhập lại password...'
                            onChange={(e) => handleOnchangeInput(e.target.value, 'confirmPassword')}
                        />
                    </div>
                    <div className="form-group-item">
                        <label >Tên hiển thị</label>
                        <input
                            type="text"
                            name='nameDisplay'
                            value={admin.nameDisplay}
                            placeholder='Nhập tên hiển thị...'
                            onChange={(e) => handleOnchangeInput(e.target.value, 'nameDisplay')}
                        />
                    </div>
                    <button className="btn btn-submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Thêm admin
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddAdmin