import React from "react";
import './loginForm.css';
import {Field, reduxForm} from 'redux-form';
import renderField from "../../forms/renderField";
import {validate} from "../../forms/validate";
import {Redirect} from "react-router-dom";


let LoginForm = (props) => {
    const { handleSubmit, isAuth, user } = props;

    return (

        (isAuth) ? <Redirect to={`/${user}`}/> :
            <div className='container'>
                <div className="wrap app login d-flex">
                    <form onSubmit={handleSubmit} className='d-flex flex-column'>
                        <Field type='text' component={renderField} placeholder='login' name ='login' className='form-control'/>
                        <Field type='password' component={renderField} placeholder='password' name ='password' className='form-control'/>
                        <button className={`login_btn`}>Войти</button>
                    </form>
                </div>
            </div>

    )
};

LoginForm = reduxForm({
    form: 'login',
    validate: validate
})(LoginForm);

export default LoginForm;


