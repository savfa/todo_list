import React from 'react';
import {Field, reduxForm} from 'redux-form';
import './todoListItemAddForm.css';
import '../forms.css';
import renderField from "../renderField";
import {validate} from "../validate";


let TodoListItemAddForm = (props) => {
    const { handleSubmit, addedMode} = props;

    return (
        addedMode &&
        <form onSubmit={handleSubmit}>
            <p>Добавить новое дело</p>
            <div className={`d-flex`}>
                <div className={`d-flex flex-column input`} >
                    <Field  name="newItem" component={renderField} type="text" placeholder="Добавить новое дело"/>
                </div>
                <button type='submit' className='btn btn-outline-success addTask'>Ok</button>
            </div>
        </form>
    )
}


TodoListItemAddForm = reduxForm({
    form: 'newItem',
    validate: validate
})(TodoListItemAddForm);

export default TodoListItemAddForm;