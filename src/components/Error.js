import React from 'react'

const Error = ({error = {}, ...rest}) => (
    <>
        {error && (
            <div className="invalid-feedback" {...rest} >{error.message}</div>
        )}
    </>
)

export default Error;