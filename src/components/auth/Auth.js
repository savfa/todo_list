import React from 'react';
import './auth.css'
import {Link} from "react-router-dom";


const Auth = function ({user, isAuth, unLogin}) {
    return (
        <div>
            <p className='auth'>Привет: <i>{user}</i></p>
            { (!isAuth) ?
                <p className='auth'>
                    <Link to="/login">вход</Link>
                    <i> / </i>
                    <Link to="/registration">регистрация</Link>
                </p>
                 :
                <p className='auth' onClick={() =>unLogin()}>
                    <Link to="/" className='auth'>выйти</Link>
                </p>
            }
        </div>
    )
};

export default Auth;