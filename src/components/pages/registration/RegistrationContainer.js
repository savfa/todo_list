import React from "react";
import {connect} from "react-redux";
import RegistrationForm from "../../forms/RegistrationForm/RegistrationForm";
import {registrationThunk} from "../../../redux/registrationReducer";



const RegistrationContainer = (props) => {
    return (
            <RegistrationForm onSubmit={(data)=>props.setRegistration(data)} {...props}/>
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
        setRegistration: (data) => {
          dispatch(registrationThunk(data))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);