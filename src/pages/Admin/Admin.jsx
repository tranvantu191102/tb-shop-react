import React, { useEffect } from 'react'

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../../components/Admin/HeaderAdmin';


const Admin = () => {
    const admin = useSelector(state => state.admin.login.admin)

    const navigate = useNavigate()
    useEffect(() => {
        if (!admin) {
            navigate('/admin/login')
        }
    }, [admin])

    return (
        <div className='admin'>
            <div className="admin-wrap">

                <HeaderAdmin />



            </div>
        </div>
    )
}

export default Admin