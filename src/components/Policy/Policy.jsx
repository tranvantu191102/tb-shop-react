import React from 'react'
import { Link } from 'react-router-dom'

const Policy = () => {
    const policyData = [
        {
            name: "Miễn phí giao hàng",
            description: "Miễn phí ship với đơn hàng > 239K",
            icon: "bx bx-shopping-bag"
        },
        {
            name: "Thanh toán COD",
            description: "Thanh toán khi nhận hàng (COD)",
            icon: "bx bx-credit-card"
        },
        {
            name: "Khách hàng VIP",
            description: "Ưu đãi dành cho khách hàng VIP",
            icon: "bx bx-diamond"
        },
        {
            name: "Hỗ trợ bảo hành",
            description: "Đổi, sửa đồ tại tất cả store",
            icon: "bx bx-donate-heart"
        }
    ]
    return (
        <div className="policy">
            <div className="policy__list">
                {
                    policyData.map((item, index) => (
                        <Link key={index} to='/policy'>
                            <div className="policy__list__item">
                                <div className="policy__list__item__icon">
                                    <i className={item.icon}></i>
                                </div>
                                <div className="policy__list__item__info">
                                    <div className="policy__list__item__info__name">
                                        {item.name}
                                    </div>
                                    <span className="policy__list__item__info__description">
                                        {item.description}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Policy