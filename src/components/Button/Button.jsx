import React from 'react'

const Button = (props) => {
    const size = props.size ? props.size : ''

    return (
        <button className={`button button-${size}`}
            onClick={() => props.onClick() ? props.onClick : null}
        >

            <div className="button__name">
                <span>{props.name}</span>
            </div>
            {
                props.icon ?
                    <div className="button__icon">
                        <i className={props.icon} ></i>
                    </div>
                    : null
            }
        </button>
    )
}

export default Button