import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer__information">
                <div className="footer__information__hotline">
                    <div className="footer__information__hotline__item">
                        <h2>Mua hàng trực tuyến</h2>
                        <span>0938.803.633</span>
                        <span>1900.633.501</span>
                        <p>sale.online@tbshop.vn</p>
                    </div>
                    <div className="footer__information__hotline__item">
                        <h2>hotline góp ý</h2>
                        <span>0908.18.12.89</span>
                        <p>cskh@tbshop.vn</p>
                    </div>
                </div>
                <div className="footer__information__info">
                    <div className="footer__information__info__item">
                        <h3 className='title'>Thông tin</h3>
                        <p>
                            <Link to='/gioi-thieu'>
                                Giới thiệu
                            </Link>
                        </p>
                        <p>
                            <Link to='/lien-he-cong-ty'>
                                Liên hệ công ty
                            </Link>
                        </p>
                        <p>
                            <Link to='/doi-tac'>
                                Đối tác
                            </Link>
                        </p>
                        <p>
                            <Link to='/tuyen-dung'>
                                Tuyển dụng
                            </Link>
                        </p>
                    </div>
                    <div className="footer__information__info__item">
                        <h3 className='title'>Chính sách</h3>
                        <p>
                            <Link to='/chinh-sach-doi-hang'>
                                Chính sách đổi hàng
                            </Link>
                        </p>
                        <p>
                            <Link to='/chinh-sach-bao-hanh'>
                                Chính sách bảo hành
                            </Link>
                        </p>
                        <p>
                            <Link to='/chinh-sach-bao-mat'>
                                Chính sách bảo mật
                            </Link>
                        </p>
                        <p>
                            <Link to='/chinh-sach-hoan-tien'>
                                Chính sách hoàn tiền
                            </Link>
                        </p>
                    </div>
                    <div className="footer__information__info__item">
                        <h3 className='title'>FAQ</h3>
                        <p>
                            <Link to='/thanh-toan-va-van-chuyen'>
                                Thanh toán và vận chuyển
                            </Link>
                        </p>
                        <p>
                            <Link to='/huong-dan-chon-size'>
                                Hướng dẫn chọn size
                            </Link>
                        </p>
                        <p>
                            <Link to='/kiem-tra-thong-tin-don-hang'>
                                Kiểm tra thông tin đơn hàng
                            </Link>
                        </p>
                        <p>
                            <Link to='/cau-hoi-thuong-gap'>
                                Câu hỏi thường gặp
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="footer__search">
                <div className="footer__search__input">
                    <label >Đăng ký nhận khuyến mãi</label>
                    <input type="text" className='input' placeholder='Nhập vào email của bạn...' />
                    <input type="submit" className='btn-submit' name="" id="" value='Gửi' />
                </div>
                <div className="footer__search__input">
                    <label >Tra cứu đơn hàng của bạn</label>
                    <input type="text" className='input' placeholder='Nhập SDT hoặc Mã số đơn hàng...' />
                    <input type="submit" className='btn-submit' name="" id="" value='Tìm' />
                </div>
                <div className="footer__search__complaint">
                    <i className='bx bx-envelope'></i>
                    <span>Góp ý/Than phiền</span>
                </div>
            </div>
            <div className="footer__address">
                <p>Địa chỉ: 304 - 306 Nguyễn Trãi, P.8, Q.5, TPHCM/ Điện thoại: 0938803633/DKKD số: 41C8013053 cấp ngày 01/12/2010, nơi cấp UBND Quận 3

                </p>
            </div>
        </footer>
    )
}

export default Footer