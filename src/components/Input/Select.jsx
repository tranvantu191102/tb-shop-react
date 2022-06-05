import React, { useRef } from 'react'

const Select = (props) => {
    const selectRef = useRef()
    const onChange = () => {
        if (props.onChange) {
            props.onChange(selectRef.current)
        }
    }
    return (
        <div className='select-container'>
            <label >{props.title}</label>
            <select
                value={props.value ? props.value : undefined}
                ref={selectRef}
                name="select-item"
                onChange={onChange}
            >
                {
                    props.types.map((item, index) => (
                        <option key={index} value={item.type || item.id}>{item.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default Select