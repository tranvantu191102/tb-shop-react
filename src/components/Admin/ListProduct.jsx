import React, { useEffect, useState } from 'react'
import HeaderAdmin from './HeaderAdmin'

import { listProductApi, deleteProductApi } from '../../api/product'
import { Link } from 'react-router-dom'
const ListProduct = () => {

    const [listProducts, setListProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const products = await listProductApi('all')
            if (products) {
                setListProducts(products.products)
            }
        }
        getProducts()
    }, [listProducts])

    const hanldeDeleteProduct = async (id) => {
        const res = await deleteProductApi(id)
        if (res) {
            alert('Xoá sản phẩm thành công')
        }
    }


    return (
        <div>
            <HeaderAdmin />
            <div className="list-product">
                <div className="list-product__title">Danh sách sản phẩm</div>

                <table>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Giá hiện tại</th>
                            <th>Số lượng</th>
                            <th>Đã bán</th>
                            <th>Giảm giá</th>
                            <th>Hành động</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            listProducts && listProducts.length > 0
                            && listProducts.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.priceCurrent}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.sold ? item.sold : 0}</td>
                                    <td>{item.discount ? item.discount : 0}</td>
                                    <td>
                                        <button className="btn btn-edit">
                                            <Link to={`/admin/edit-product/${item._id}`}>Chỉnh sửa</Link>
                                        </button>
                                        <button className="btn btn-delete"
                                            onClick={() => hanldeDeleteProduct(item._id)}
                                        >Xoá</button>
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

export default ListProduct