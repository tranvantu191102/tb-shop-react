import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash'
import { adminLogout } from '../../api/admin';
import { useNavigate } from 'react-router-dom';

const HeaderAdmin = () => {
    const admin = useSelector(state => state.admin.login.admin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = () => {
        adminLogout(dispatch)
        navigate('/admin/login')
    }

    return (
        <div className="admin-header">
            <ul className="admin-header__menu">
                <li className="admin-header__item">
                    <span>Quản lí người dùng</span>
                    <div className="admin-header__item-sub">
                        <Link to='/admin/list-user'>Danh sách người dùng</Link>
                        <Link to='/admin/edit-user'>Chỉnh sửa người dùng</Link>
                    </div>
                </li>
                <li className="admin-header__item">
                    <span>Quản lí admin</span>
                    <div className="admin-header__item-sub">
                        <Link to='/admin/list-admin'>Danh sách admin</Link>
                        <Link to='/admin/add-admin'>Thêm admin</Link>
                    </div>
                </li>
                <li className="admin-header__item">
                    <span>Quản lí sản phẩm</span>
                    <div className="admin-header__item-sub">
                        <Link to='/admin/list-product'>Danh sách sản phẩm</Link>
                        <Link to='/admin/add-product'>Thêm sản phẩm</Link>
                    </div>
                </li>
            </ul>

            <div className="admin-header__right">
                {
                    !_.isEmpty(admin)
                        ? <h3 className="admin-name">{`Hi, ${admin.nameDisplay}`}</h3>
                        :
                        <button className="btn btn-logout" style={{ marginRight: '1rem' }}><Link to='/admin/login'>Đăng nhập</Link></button>
                }
                <button className="btn btn-logout"
                    onClick={handleLogOut}
                >
                    Log out
                </button>
            </div>
        </div>
    )
}

export default HeaderAdmin