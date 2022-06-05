import React, { useState, useEffect } from 'react'
import HeaderAdmin from './HeaderAdmin'

import { getAdminById, editAdmin } from '../../api/admin'
import { useParams } from 'react-router-dom'
const EditAdmin = () => {

    const { id } = useParams()

    const [admin, setAdmin] = useState({})


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
        const fieldEmpty = confirmForm(['nameDisplay'])
        if (fieldEmpty) {
            return alert(fieldEmpty)
        }
        editAdmin(admin, id)
    }


    useEffect(() => {
        const getAdminFunc = async () => {
            const res = await getAdminById(id)
            if (res) {
                setAdmin(res.admin)
            }
        }
        getAdminFunc()
    }, [])


    return (
        <div>
            <HeaderAdmin />
            <div className="edit-admin">
                <form action="">
                    <div className="form-group-item">
                        <label >Tên hiển thị</label>
                        <input
                            value={admin.nameDisplay}
                            type="text"
                            name='nameDisplay'
                            onChange={(e) => handleOnchangeInput(e.target.value, 'nameDisplay')}
                        />
                    </div>
                    <button className="btn btn-submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Lưu admin
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditAdmin