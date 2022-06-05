import React, { useEffect, useState } from 'react'
import HeaderAdmin from './HeaderAdmin'
import { getAdmin } from '../../api/admin'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteAdmin } from '../../api/admin'

const ListAdmin = () => {

    const dispatch = useDispatch()

    const listAdmin = useSelector(state => state.admin.listAdmin.listAdmin)

    useEffect(() => {
        getAdmin(dispatch)
    }, [listAdmin])

    const handleDeleteAdmin = (id) => {
        deleteAdmin(id)
        alert('Xoá admin thành công')
    }

    return (
        <div className='container-wrap'>
            <HeaderAdmin />
            <div className="list-admin-container">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Email</th>
                            <th>Tên hiển thị</th>
                            <th colSpan='2'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listAdmin && listAdmin.length > 0
                            && listAdmin.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.nameDisplay}</td>
                                    <td>
                                        <button className="btn btn-edit-admin">
                                            <Link to={`/admin/edit-admin/${item._id}`}>Chỉnh sửa</Link>
                                        </button>
                                        <button className="btn btn-delete-admin"
                                            onClick={() => handleDeleteAdmin(item._id)}
                                        >
                                            <Link to='#'>Xoá</Link>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default ListAdmin