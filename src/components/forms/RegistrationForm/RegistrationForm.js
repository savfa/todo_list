import React from "react";
import './registration.css';
import {Field, reduxForm} from "redux-form";
import {validate} from "../validate";
import renderField from "../renderField";
import {Redirect} from "react-router-dom";


let RegistrationForm = (props) => {
    const { handleSubmit, isAuth, user } = props;
    return (
        (isAuth) ? <Redirect to={`/${user}`}/> :
        <div className='container'>
            <div className="wrap app login d-flex">
                <form className='d-flex flex-column' onSubmit={handleSubmit}>
                    <Field type='text' component={renderField} placeholder='login' name ='login' className='form-control'/>
                    <Field type='email' component={renderField} placeholder='email' name ='email' className='form-control'/>
                    <Field type='password' component={renderField} placeholder='password' name ='password' className='form-control'/>
                    <button className={`login_btn`}>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    )
};

RegistrationForm = reduxForm({
    form: 'registration',
    validate: validate
})(RegistrationForm);


export default RegistrationForm;

