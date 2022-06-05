import React, { useState } from 'react'

const SidebarProduct = (props) => {
    const sidebars = [
        {
            id: 'all',
            code: 0,
            name: 'Tất cả'
        },
        {
            id: '0',
            code: 1,
            name: 'Nam'
        },
        {
            id: '1',
            code: 1,
            name: 'Nữ'
        },
        {
            id: 'ao',
            code: 2,
            name: 'Áo'
        },
        {
            id: 'quan',
            code: 2,
            name: 'Quần'
        },
        {
            id: 'phu-kien',
            code: 2,
            name: 'Phụ kiện'
        },
    ]

    const [activeItem, setActiveItem] = useState('all')

    const handleSelect = (id, code) => {
        setActiveItem(id)
        props.onClick(code, id)
    }
    return (
        <div className="sidebar-product">
            <div className="sidebar-product__title">
                <i className='bx bx-list-ul'></i>
                <span>Danh mục</span>
            </div>
            <div className="sidebar-product__catalog">
                {
                    sidebars.map((item, index) => (
                        <div
                            className={`sidebar-product__catalog__item ${activeItem === item.id ? 'active' : ''}`}
                            key={index}
                            onClick={() => handleSelect(item.id, item.code)}
                        >
                            <span>{item.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SidebarProduct