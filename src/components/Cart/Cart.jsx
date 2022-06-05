import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button/Button'
import numberWithCommas from '../../utils/NumberWithCommas'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import _ from 'lodash'
import { deleteCartRedux, updateCartRedux } from '../../redux/userSlice'

import Modal from '../Modal/Modal'
const Cart = () => {

    const cart = useSelector(state => state.user.cart)
    const user = useSelector(state => state.user.login.user)

    const [isShowModal, setIsShowModal] = useState(false)

    const [totalItem, setTotalItem] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch()

    console.log(isShowModal)
    useEffect(() => {
        const setTotal = () => {
            let totalItemTemp = 0
            let totalPriceTemp = 0
            cart.forEach(item => {
                totalItemTemp += item.quantity
                totalPriceTemp += item.priceCurrent * item.quantity
            })

            setTotalItem(totalItemTemp)
            setTotalPrice(totalPriceTemp)
        }

        setTotal()
    }, [cart])

    const handleChangeQuantity = (option, item) => {
        if (option === '+') {
            const quantity = item.quantity + 1
            dispatch(updateCartRedux({ ...item, quantity }))
        }

        if (option === '-') {
            const quantity = item.quantity === 1 ? 1 : item.quantity - 1
            dispatch(updateCartRedux({ ...item, quantity }))
        }
    }


    return (
        <div className='cart-container'>
            <Header />
            {
                user && !_.isEmpty(user) ?
                    <div className="cart">
                        <div className="cart__overview">
                            <div className="cart__overview__quantity">
                                <p>Tổng số hàng bạn đang có trong giỏ hàng: </p> <span>{totalItem}</span>
                            </div>
                            <div className="cart__overview__total-price">
                                <p>Thành tiền</p>
                                <span>{`${numberWithCommas(+totalPrice)} đ`}</span>
                            </div>
                            <div className="cart__overview__booking">
                                <Button
                                    name='Đặt hàng ngay'
                                    icon='bx bx-cart'
                                    size='lg'
                                    onClick={() => setIsShowModal(true)}
                                />
                            </div>
                            <div className="cart__overview__purchasing">
                                <Link to='/product'>
                                    <Button
                                        name='Tiếp tục mua hàng'
                                        icon='bx bx-cart'
                                        size='lg'
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="cart__info">
                            {
                                cart && cart.length > 0 &&
                                cart.map((item, index) => (
                                    <div className="col-12" key={index}>
                                        <CartItem data={item} handleChangeQuantity={handleChangeQuantity} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    :
                    <div className='cart'>
                        <div className="cart__error">
                            VUI LÒNG ĐĂNG NHẬP
                        </div>
                    </div>
            }
            <Footer />
            <Modal
                isShowModal={isShowModal}
                setIsShowModal={setIsShowModal}
                user={user}
                cart={cart}
                title="Thanh toán"
            />
        </div>
    )
}

const CartItem = (props) => {
    const data = props.data
    const handleChangeQuantity = props.handleChangeQuantity
    const dispatch = useDispatch()
    const handleDeleteItem = (data) => {
        dispatch(deleteCartRedux(data))
    }


    return (
        <div className='cart__item'>
            <div className="cart__item__image">
                <img src={data.image1} alt="" />
            </div>
            <h3 className="cart__item__name">{data.name}</h3>
            <p className="cart__item__price">{numberWithCommas(+data.priceCurrent)}</p>
            <div className="cart__item__quantity">
                <i className={`bx bx-up-arrow`}
                    onClick={() => handleChangeQuantity('+', data)}
                ></i>
                <span>{data.quantity}</span>
                <i className={`bx bx-down-arrow ${data.quantity === 1 ? "disable" : ''}`}
                    onClick={() => handleChangeQuantity('-', data)}
                ></i>
            </div>
            <div
                className="cart__item__delete"
                onClick={() => handleDeleteItem(data)}
            >
                <i className='bx bx-trash'></i>
            </div>
        </div>
    )
}

export default Cart