import { useState } from 'react'
import Modal from './Modal'

import numberWithCommas from '../../utils/NumberWithCommas'
const ModalPayment = (props) => {
    const [isShowModal, setIsShowModal] = useState(props.isShowModal)
    const { user, cart } = props
    console.log('hello')
    return (
        <Modal
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
            title="Payment"
        >
            <div className="modal-payment__user">
                <h3 className="modal-payment__user__title">Thông tin người đặt</h3>
                <h4 className="name">{`Họ và tên: ${user.name}`}</h4>
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
        </Modal>
    )
}

export default ModalPayment