import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Form from '../components/Login/Form';
import AdminLogin from '../components/Admin/AdminLogin';
import Admin from '../pages/Admin/Admin';
import ListUser from '../components/Admin/ListUser';
import EditUser from '../components/Admin/EditUser';
import ListAdmin from '../components/Admin/ListAdmin';
import EditAdmin from '../components/Admin/EditAdmin';
import ListProduct from '../components/Admin/ListProduct';
import EditProduct from '../components/Admin/EditProduct';
import AddProduct from '../components/Admin/AddProduct';
import AddAdmin from '../components/Admin/AddAdmin';

import HomePage from '../pages/PageShop/HomePage'
import Product from '../pages/PageShop/Product';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import Accessory from '../pages/PageShop/Accessory';
import Policy from '../pages/PageShop/Policy';
import Cart from '../components/Cart/Cart';
import Profile from '../components/Profile/Profile';
import { useSelector } from 'react-redux';
import _ from 'lodash'

const Router = () => {

    const admin = useSelector(state => state.admin.login.admin)

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' >
                    <Route index element={<HomePage />} />
                    <Route path='login' element={<Form />} />
                    <Route path='admin' >
                        <Route index element={<Admin />} />
                        <Route path='login' element={<AdminLogin />} />
                        {
                            admin && !_.isEmpty(admin)
                            && <>
                                <Route path='list-user' element={<ListUser />} />
                                <Route path='edit-user' element={<EditUser />} />
                                <Route path='list-admin' element={<ListAdmin />} />
                                <Route path='edit-admin/:id' element={<EditAdmin />} />
                                <Route path='add-admin' element={<AddAdmin />} />
                                <Route path='list-product' element={<ListProduct />} />
                                <Route path='edit-product/:id' element={<EditProduct />} />
                                <Route path='add-product' element={<AddProduct />} />
                            </>
                        }
                    </Route>\
                    <Route path='product'>
                        <Route index element={<Product />} />
                        <Route path=':id' element={<ProductDetail />} />
                    </Route>
                    <Route path='accessory' element={<Accessory />} />
                    <Route path='policy' element={<Policy />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='profile' element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router