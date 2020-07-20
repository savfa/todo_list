import React from 'react';
import './renameItemForm.css';
import {Field, reduxForm} from 'redux-form';
import renderField from "../renderField";
import {validate} from "../validate";


let RenameItemForm = (props) => {
    const { handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit} className={'renameItemForm'}>
            <Field name="renameItem" component={renderField} type="text"/>
        </form>
    )
};

RenameItemForm = reduxForm({
    form: 'renameItem',
    validate: validate,
    initialValues:{renameItem:''}
})(RenameItemForm);

export default RenameItemForm;