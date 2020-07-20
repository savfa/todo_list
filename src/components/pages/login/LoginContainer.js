import React from "react";
import LoginForm from "../../forms/LoginForm/loginForm";
import {connect} from "react-redux";
import {loginThunk} from "../../../redux/loginReducer";


const LoginContainer = (props) => {
    return (
            <LoginForm onSubmit={(data)=>(props.getLogin(data))} {...props}/>
    )
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.mainPage.isAuth,
        user: state.mainPage.user
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        getLogin: (data) => {
           dispatch(loginThunk(data))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);