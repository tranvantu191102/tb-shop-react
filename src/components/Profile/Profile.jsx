import React, { useState, useRef } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import Input from '../Input/Input'
import Button from '../Button/Button'

import avatarImg from '../../assets/images/add-photo.png'
import userAvatar from '../../assets/images/referral.png'
import Select from '../Input/Select'

import { updateUser } from '../../api/user'
import { updateUserLogin } from '../../redux/userSlice'

const Profile = () => {
    const user = useSelector(state => state.user.login.user)
    const genders = [
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
    const dispatch = useDispatch()
    const [address, setAddress] = useState(user.address || '')
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '')
    const [gender, setGender] = useState(user.gender || '0')
    const [nameDisplay, setNameDisplay] = useState(user.nameDisplay)
    const [avatar, setAvatar] = useState('')
    const refImage = useRef()

    const handleSaveInfoUser = async () => {
        const res = await updateUser(user._id, {
            ...user,
            gender,
            phoneNumber,
            address,
            nameDisplay,
            avatar
        })
        if (res) {
            dispatch(updateUserLogin({
                ...user,
                gender,
                phoneNumber,
                address,
                nameDisplay,
                avatar
            }))
            alert("Lưu thành công")
        }
    }

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

    const handleOnChangeImage = async (e) => {
        refImage.current.src = window.URL.createObjectURL(e.target.files[0])
        setAvatar(await toBase64(e.target.files[0]))
    }

    console.log(avatar)

    return (
        <div>
            <Header />
            {
                user && !_.isEmpty(user) ?
                    <div className="profile">
                        <div className="profile__avatar">
                            <img src={user.avatar || userAvatar} alt="" ref={refImage} />
                        </div>
                        <div className="profile__information">
                            <div className="profile__information__title">
                                <h3>{`Thông tin về ${user.nameDisplay}`}</h3>
                            </div>
                            <div className="row">
                                <span>Tải ảnh lên</span>
                                <label htmlFor='image'><img src={avatarImg} alt="" /></label>
                                <input type="file"
                                    hidden={true}
                                    id="image"
                                    onChange={(e) => handleOnChangeImage(e)}
                                />
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Input
                                        label='Tên hiển thị'
                                        type='text'
                                        value={nameDisplay}
                                        onChange={(e) => setNameDisplay(e.value)}
                                    />
                                </div>

                                <div className="col-4">
                                    <Input
                                        label='Số điện thoại'
                                        type='text'
                                        onChange={(e) => setPhoneNumber(e.value)}
                                        value={phoneNumber || null}
                                    />
                                </div>
                                <div className="col-4">
                                    <Input
                                        label='Email'
                                        type='email'
                                        value={user.email}
                                    />
                                </div>
                                <div className="col-4">
                                    <Select
                                        title="Giới tính"
                                        types={genders}
                                        onChange={(e) => setGender(e.value)}
                                        value={gender || null}
                                    />
                                </div>
                                <div className="col-12">
                                    <Input
                                        label='Địa chỉ'
                                        type='text'
                                        onChange={(e) => setAddress(e.value)}
                                        value={address || null}
                                    />
                                </div>
                                <Button
                                    name="Lưu thông tin"
                                    icon="bx bx-save"
                                    onClick={handleSaveInfoUser}
                                />
                            </div>
                        </div>
                    </div>
                    :
                    <div>Vui lòng đăng nhập</div>

            }
            <Footer />
        </div>
    )
}

export default Profile