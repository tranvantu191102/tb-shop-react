import React from 'react'

import { Link } from 'react-router-dom'
import numberWithCommas from '../../utils/NumberWithCommas'
import Button from '../Button/Button'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const ProductItem = (props) => {
  const { data } = props
  const user = useSelector(state => state.user.login.user)
  const navigate = useNavigate()

  const handleAddToCart = (id) => {

    if (!user) {
      alert('Vui lòng đăng nhập')
    } else {
      navigate(`/product/${id}`)
    }
  }

  return (
    <div className='product-item'>
      <Link to={`/product/${data._id}`}>
        <div className="product-item__img">
          <img src={data.image1} alt="" className="image-1" />
          <img src={data.image2} alt="" className="image-2" />
        </div>
        <div className="product-item__price">
          <span className="product-item__price__old">{`${numberWithCommas(+data.priceOld)} đ`}</span>
          <span className="product-item__price__current">{`${numberWithCommas(+data.priceCurrent)} đ`}</span>
        </div>
      </Link>
      <div className="product-item__btn">
        <div className="btn-buy">
          <Link to={`/product/${data._id}`}> <Button name='Mua ngay' icon='bx bx-cart' /></Link>
        </div>
        <div className="btn-add-cart">
          <Button
            name='Thêm vào giở hàng'
            icon='bx bx-cart'
            onClick={() => handleAddToCart(data._id)}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductItem