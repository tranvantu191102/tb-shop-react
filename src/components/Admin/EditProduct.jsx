import React, { useEffect, useState, useRef } from 'react'
import HeaderAdmin from './HeaderAdmin'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductApi, editProductApi } from '../../api/product'
import Input from '../Input/Input'
import Select from '../Input/Select'

const EditProduct = () => {
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
    const gender = [
        {
            id: 0,
            name: 'Nam'
        },
        {
            id: 1,
            name: 'Nữ'
        }
    ]

    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const imageRef1 = useRef()
    const imageRef2 = useRef()

    useEffect(() => {
        const getProduct = async () => {
            const res = await getProductApi(id)
            if (res) {
                setProduct(res.data.product)
            }
        }
        getProduct()
    }, [id])

    const handleOnChangeText = (e) => {
        setProduct({ ...product, description: e.target.value })
    }

    const handleOnchangeInput = (e, id) => {
        setProduct({ ...product, [id]: e.value })

    }
    const handleOnchangeSelect = (e, id) => {

        setProduct({ ...product, [id]: e.value })

    }

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

    const handleOnchangeInputImage = async (e, id) => {
        if (id === 'image1') {
            imageRef1.current.src = window.URL.createObjectURL(e.files[0])
            const imageTemp = await toBase64(e.files[0])
            setProduct({ ...product, image1: imageTemp })
        } else {
            imageRef2.current.src = window.URL.createObjectURL(e.files[0])
            const imageTemp = await toBase64(e.files[0])
            setProduct({ ...product, image2: imageTemp })
        }
    }


    const handleEditProduct = async () => {
        const res = await editProductApi(id, { ...product, size: sizes })
        if (res) {
            alert('Chỉnh sửa sản phẩm thành công')
            navigate('/admin/list-product')
        }
    }

    return (
        <div>
            <HeaderAdmin />
            <div className="edit-product">
                <h2 className="edit-product__title">Chỉnh sửa sản phẩm</h2>
                <div className="edit-product__form">
                    <div className="row">
                        <div className="col-6">
                            <Input
                                label="Ảnh 1"
                                type="file"
                                onChange={(e) => handleOnchangeInputImage(e, 'image1')}
                            />
                            <img ref={imageRef1}
                                src={product.image1 ? product.image1 : null}
                                id='blah' alt="image"
                                width='100' height='100'
                            />
                        </div>
                        <div className="col-6">
                            <Input
                                label="Ảnh 2"
                                type="file"
                                onChange={(e) => handleOnchangeInputImage(e, 'image2')}
                            />
                            <img ref={imageRef2}
                                src={product.image2 ? product.image2 : null}
                                id='blah' alt="image"
                                width='100' height='100'
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <Input
                                label="Tên sản phẩm"
                                onChange={(e) => handleOnchangeInput(e, 'name')}
                                value={product.name}
                            />
                        </div>
                        <div className="col-4">
                            <Select
                                title="Chọn kiểu"
                                types={types}
                                onChange={(e) => handleOnchangeSelect(e, 'type')}
                            />
                        </div>
                        <div className="col-4">
                            <Select
                                title="Dành cho"
                                types={gender}
                                onChange={(e) => handleOnchangeSelect(e, 'forGender')}
                                value={product.forGender ? product.forGender : undefined}
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-3">
                            <Input
                                label="Giá cũ"
                                onChange={(e) => handleOnchangeInput(e, 'priceOld')}
                                value={product.priceOld ? product.priceOld : 0}
                            />
                        </div>
                        <div className="col-3">
                            <Input
                                label="Giá hiện tại"
                                onChange={(e) => handleOnchangeInput(e, 'priceCurrent')}
                                value={product.priceCurrent}
                            />
                        </div>
                        <div className="col-3">
                            <Input
                                label="Số lượng"
                                onChange={(e) => handleOnchangeInput(e, 'quantity')}
                                value={product.quantity}
                            />
                        </div>
                        <div className="col-3">
                            <Input
                                label="Giảm giá"
                                onChange={(e) => handleOnchangeInput(e, 'discount')}
                                value={product.discount ? product.discount : 0}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 add-product-decsription">
                            <label>Mô tả sản phẩm</label>
                            <textarea name=""
                                onChange={(e) => handleOnChangeText(e)}
                                value={product.description}
                            >

                            </textarea>
                        </div>
                    </div>

                    <button className="btn btn-add-product"
                        onClick={() => handleEditProduct()}
                    >
                        Lưu sản phẩm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditProduct