import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const override = css`
display: block;
margin-top: 10rem;
border: 2px solid #000000;
`
const Loading = (props) => {

    const loading = props.loading
    return (

        loading &&
        <div className="loading">
            <div className="overlay">
                <ClipLoader
                    size={100}
                    color='#ffffff'
                    loading={props.loading}
                    css={override}
                />
            </div>
        </div>

    )
}

export default Loading