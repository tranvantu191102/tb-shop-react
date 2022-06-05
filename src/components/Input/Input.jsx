import React, { useRef } from 'react'

const Input = (props) => {

    const inputRef = useRef()

    const onChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current)
        }
    }
    return (
        <div className="input-container">
            <label >{props.label}</label>
            <input
                type={props.type ? props.type : 'text'}
                ref={inputRef}
                onChange={onChange}
                placeholder={props.placeholder ? props.placeholder : null}
                name={props.name ? props.name : null}
                className="input-item"
                value={props.value ? props.value : undefined}
            />
        </div>
    )
}

export default Input