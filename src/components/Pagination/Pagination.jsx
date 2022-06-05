import React, { useState } from 'react'

const Pagination = (props) => {
    const [active, setActive] = useState(1)

    const length = props.length
    const handleSetProductsRender = props.handleSetProductsRender
    const itemPerPage = 20

    const totalPage = length % itemPerPage === 0 ? length / itemPerPage : parseInt(length / itemPerPage) + 1
    const pages = []
    for (let i = 0; i < totalPage; i++) {
        pages.push(i)
    }

    const handleClickPage = (item) => {
        setActive(item + 1)
        handleSetProductsRender(item)
    }

    return (
        <div className="pagination">
            {
                totalPage > 6 ? <i class='bx bx-chevron-left'></i> : null
            }
            {
                pages.map((item, index) => (
                    <span
                        key={index}
                        onClick={() => handleClickPage(item)}
                        className={`pagination__index ${active === item + 1 ? 'active' : ''}`}
                    >
                        {item + 1}
                    </span>
                ))
            }
            {
                totalPage > 6 ? <i class='bx bx-chevron-right'></i> : null
            }
        </div>
    )
}

export default Pagination