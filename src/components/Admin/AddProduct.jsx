import React, { useRef, useState } from 'react'
import HeaderAdmin from './HeaderAdmin'

import Input from '../Input/Input'
import Select from '../Input/Select'
import { useNavigate } from 'react-router-dom'

import { addProductApi } from '../../api/product'
const AddProduct = () => {
    const types = [
        {
            type: 'ao',
            slug: 'ao-thun',
            name: 'Áo thun'
        },
        {
            type: 'ao',
            slug: 'ao-so-mi',
            name: 'Áo sơ mi'
        },
        {
            type: 'ao',
            slug: 'ao-khoac',
            name: 'Áo khoác'
        },
        {
            type: 'quan',
            slug: 'quan-jean',
            name: 'Quần jean'
        },
        {
            type: 'quan',
            slug: 'quan-tay',
            name: 'Quần tây'
        },
        {
            type: 'quan',
            slug: 'quan-short',
            name: 'Quần short'
        },
        {
            type: 'phu-kien',
            slug: 'mu',
            name: 'Mũ'
        },
        {
            type: 'phu-kien',
            slug: 'balo',
            name: 'Balo'
        },
        {
            type: 'phu-kien',
            slug: 'thac-lung',
            name: 'Thắc lưng'
        },
    ]
    const gender = [
        {
            id: 0,
            name: 'Nam'
        },
        {
            id: 1,
            name: 'Nữ'
        },
        {
            id: 2,
            name: 'Cả hai'
        }
    ]
    const sizes = [
        {
            id: 's',
            name: 'S'
        },
        {
            id: 'm',
            name: 'M'
        },
        {
            id: 'l',
            name: 'L'
        },
        {
            id: 'xl',
            name: 'XL'
        },
        {
            id: 'xxl',
            name: 'XXL'
        },
    ]
    const imageRef1 = useRef()
    const imageRef2 = useRef()
    const navigate = useNavigate()

    const [infoProduct, setInfoProduct] = useState({
        name: '',
        description: '',
        image1: '',
        image2: '',
        type: 'ao',
        size: sizes,
        priceOld: '',
        priceCurrent: '',
        quantity: 0,
        forGender: 0
    })

    const handleOnchangeInput = (e, id) => {
        setInfoProduct({ ...infoProduct, [id]: e.value })

    }
    const handleOnchangeSelect = (e, id) => {

        setInfoProduct({ ...infoProduct, [id]: e.value })

    }

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });


    const handleAddProduct = () => {
        addProductApi(infoProduct)
        alert('Add product done!')
        navigate('/admin/list-product')
    }

    const handleOnchangeInputImage = async (e, id) => {
        if (id === 'image1') {
            imageRef1.current.src = window.URL.createObjectURL(e.files[0])
            infoProduct.image1 = await toBase64(e.files[0])
        } else {
            imageRef2.current.src = window.URL.createObjectURL(e.files[0])
            infoProduct.image2 = await toBase64(e.files[0])
        }
    }

    const handleOnChangeText = (e) => {
        setInfoProduct({ ...infoProduct, description: e.target.value })
    }


    return (
        <div>
            <HeaderAdmin />
            <div className="add-product">
                <h2 className="add-product-title">Thêm sản phẩm</h2>
                <div className="add-product-form">
                    <div className="row">
                        <div className="col-6">
                            <Input
                                label="Ảnh 1"
                                type="file"
                                onChange={(e) => handleOnchangeInputImage(e, 'image1')}
                            />
                            <img ref={imageRef1} id='blah' alt="image" width='100' height='100' />
                        </div>
                        <div className="col-6">
                            <Input
                                label="Ảnh 2"
                                type="file"
                                onChange={(e) => handleOnchangeInputImage(e, 'image2')}
                            />
                            <img ref={imageRef2} id='blah' alt="image" width='100' height='100' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <Input
                                label="Tên sản phẩm"
                                onChange={(e) => handleOnchangeInput(e, 'name')}
                            />
                        </div>
                        <div className="col-6">
                            <Select
                                title="Chọn kiểu"
                                types={types}
                                onChange={(e) => handleOnchangeSelect(e, 'type')}
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-3">
                            <Input
                                label="Giá cũ"
                                onChange={(e) => handleOnchangeInput(e, 'priceOld')}
                            />
                        </div>
                        <div className="col-3">
                            <Input
                                label="Giá hiện tại"
                                onChange={(e) => handleOnchangeInput(e, 'priceCurrent')}
                            />
                        </div>
                        <div className="col-3">
                            <Input
                                label="Số lượng"
                                onChange={(e) => handleOnchangeInput(e, 'quantity')}
                            />
                        </div>
                        <div className="col-3">
                            <Select
                                title="Dành cho"
                                types={gender}
                                onChange={(e) => handleOnchangeSelect(e, 'forGender')}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 add-product-decsription">
                            <label>Mô tả sản phẩm</label>
                            <textarea name=""
                                onChange={(e) => handleOnChangeText(e)}
                            >

                            </textarea>
                        </div>
                    </div>

                    <button className="btn btn-add-product"
                        onClick={() => handleAddProduct()}
                    >
                        Thêm sản phẩm
                    </button>
                </div>



            </div>
        </div>
    )
}

export default AddProduct