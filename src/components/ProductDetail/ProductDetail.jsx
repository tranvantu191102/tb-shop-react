import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ProductItem from '../ProductItem/ProductItem'
import numberWithCommas from '../../utils/NumberWithCommas'
import Button from '../Button/Button'

import { getProductApi, getProductsByTypeApi } from '../../api/product'
import { addToCartRedux } from '../../redux/userSlice'

import _ from 'lodash'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Modal from '../Modal/Modal'

const ProductDetail = () => {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [similar, setSimilar] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [isShowModal, setIsShowModal] = useState(false)
    const [size, setSize] = useState('s')
    const policy = [
        {
            icon: 'bx bx-chevrons-right',
            display: 'bảo hành sản phẩm 90 ngày'
        },
        {
            icon: 'bx bx-chevrons-right',
            display: 'đổi hàng trong vòng 30 ngày'
        },
        {
            icon: 'bx bx-chevrons-right',
            display: 'hotline bán hàng 1900 633 501'
        }
    ]
    const user = useSelector(state => state.user.login.user)
    const renderOptionSize = product.type === 'phu-kien' ? false : true
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { priceCurrent } = product

    useEffect(() => {
        const getProduct = async () => {
            const res = await getProductApi(id)
            if (res) {
                setProduct(res.data.product)
            }
        }
        getProduct()
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        const getProductSimilar = async () => {
            const res = await getProductsByTypeApi(product.type)
            if (res) {
                setSimilar(res.data.products.slice(0, 4))
            }
        }

        getProductSimilar()
    }, [product])

    const handleAddToCart = (id) => {
        if (!user) {
            alert('Vui lòng đăng nhập')
        } else {
            if (product.type === 'phu-kien') {
                const { name, priceCurrent, image1 } = product
                dispatch(addToCartRedux({ id, quantity, size: '', name, priceCurrent, image1 }))
                alert('Đã thêm vào giõ hàng')
            } else {
                const { name, priceCurrent, image1 } = product
                dispatch(addToCartRedux({ id, quantity, size, name, priceCurrent, image1 }))
                alert('Đã thêm vào giõ hàng')
            }
        }
    }

    // console.log(product)

    const handleQuantity = (id) => {
        if (id === '+') {
            setQuantity(quantity + 1)
        } else if (id === '-') {
            setQuantity(quantity === 1 ? 1 : quantity - 1)
        }
    }

    return (
        product && !_.isEmpty(product) &&
        <div className="product-detail">
            <Header />
            <div className="product-detail__info">
                <div className="product-detail__info__image">
                    <img src={product.image1} alt="" />
                    <img src={product.image2} alt="" />
                </div>
                <div className="product-detail__info__info">
                    <h2 className="name">{product.name}</h2>
                    <p className="price">{`${numberWithCommas(product.priceCurrent)} VND`}</p>
                    <div className="option">
                        {renderOptionSize &&
                            <div className="option__size">
                                <h3 className="option__size__title">Kích cỡ:</h3>
                                {product.size.map((item, index) => (
                                    <span
                                        className={`option__size__item ${size === item.id ? 'active' : ''}`}
                                        key={index}
                                        onClick={() => setSize(item.id)}
                                    >
                                        {item.name}
                                    </span>
                                ))}
                            </div>
                        }
                        <div className="option__quantity">
                            <h3 className="option__quantity__title">Số lượng</h3>
                            <div className="option__quantity__info">
                                <div className="option__quantity__info__number">{quantity}</div>
                                <div className="option__quantity__info__change">
                                    <i className='bx bx-up-arrow'
                                        onClick={() => handleQuantity('+')}
                                    ></i>
                                    <i className='bx bx-down-arrow'
                                        onClick={() => handleQuantity('-')}
                                    >

                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-detail__info__info__btn">
                        <div className="btn-left">
                            <Button name='Mua ngay'
                                icon='bx bx-cart'
                                size='lg'
                                onClick={() => setIsShowModal(true)}
                            />
                        </div>
                        <div className="btn-right">
                            <Button
                                name='Thêm vào giỏ hàng'
                                icon='bx bx-cart'
                                size='lg'
                                onClick={() => handleAddToCart(product._id)}
                            />
                        </div>
                    </div>
                    <div className="description">
                        <h3 className="description__title">Mô tả sản phẩm</h3>
                        <p>{product.description}</p>
                    </div>
                    <div className="product-detail__info__info__policy">
                        {
                            policy.map((item, index) => (
                                <div className="product-detail__info__info__policy__item" key={index}>
                                    <i className={item.icon}></i>
                                    <h2>{item.display}</h2>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="product-similar">
                <h3 className="product-similar__title">Sản phẩm tương tự</h3>
                <ProductSimilar data={similar} />
            </div>
            <Footer />
            <Modal
                isShowModal={isShowModal}
                setIsShowModal={setIsShowModal}
                user={user}
                cart={[{ id, quantity, priceCurrent }]}
                title="Thanh toán"
            />
        </div>
    )
}


export default ProductDetail


const ProductSimilar = (props) => {
    const { data } = props
    return (
        <div className="product-similar__info">
            <div className="row">
                {
                    data && data.length > 0
                    && data.map((item, index) => (
                        <div className="col-3" key={index}>
                            <ProductItem data={item} />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}