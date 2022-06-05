import { useState, useEffect } from 'react'
import numberWithCommas from '../../utils/NumberWithCommas'

const Modal = (props) => {

    const { isShowModal, setIsShowModal, user, cart } = props
    const [totalFee, setTotalFee] = useState(0)
    const feeShip = 30000
    useEffect(() => {
        let total = 0
        cart.forEach(item => {
            total += (+item.quantity) * (+item.priceCurrent)
        })
        setTotalFee(total)
    }, [cart])


    return (
        <div className={`modal ${isShowModal ? 'show' : ''}`}>
            <div className="modal-wrap">
                <div className="modal__header">
                    <h2 className="modal__header__title">{props.title}</h2>
                    <span onClick={() => setIsShowModal(false)}>&times;</span>
                </div>
                <div className="modal__content">
                    <div className="modal-payment__user">
                        <h3 className="modal-payment__user__title">Thông tin người đặt</h3>
                        <h4 className="name">{`Họ và tên: ${user.nameDisplay}`}</h4>
                        <p className="address">{`Địa chỉ: ${user.address}`}</p>
                    </div>
                    <div className="modal-payment__cart">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart && cart.length > 0 &&
                                    cart.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{`${numberWithCommas(+item.priceCurrent)} đ`}</td>
                                            <td>{item.quantity}</td>
                                            <td>{`${numberWithCommas(+item.priceCurrent * item.quantity)} đ`}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-payment__fee">
                        <div className="fee">{`Tổng tiền sản phẩm: ${numberWithCommas(totalFee)} đ`}</div>
                        <div className="fee">{`Tổng tiền ship: ${numberWithCommas(feeShip)} đ`}</div>
                        <div className="fee">{`Tổng tiền thanh toán: ${numberWithCommas(feeShip + totalFee)} đ`}</div>
                    </div>
                    <div className="modal-payment__btn">
                        <button className='btn btn-payment'>Thanh toán</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal