import React from "react";

const renderField = ({
                         input,
                         placeholder,
                         type,
                         meta: {touched, error, warning}
                     }) => {
    return (
        <>
            <input {...input} type={type} placeholder={placeholder} className='form-control' />
            <div className='display: block'>
                {touched &&
                ((error && <span className={'error'}>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
            </div>
        </>
    )
};

export default renderField;