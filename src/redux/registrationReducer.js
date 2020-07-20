import {authAPI} from "../api/api";
import {getUserActionCreator, isFetchingActionCreator, setTodoActionCreator} from "./mainReducer";


const SET_REGISTRATION= 'SET_REGISTRATION';


const registrationReducer = (state= {}, action) => {
    return state;
};


export const registrationThunk = (data) => (dispatch) => {
    dispatch(isFetchingActionCreator(true));

    authAPI.registration(data).then(response => {
        if (response.status === 200) {
            authAPI.login(data).then(response => {
                if (response.status === 200 && response.data) {
                    // success

                    authAPI.userIDTodoData(response.data.user_id).then(res => {
                        if (res.status === 200) {
                            dispatch(getUserActionCreator(response.data.user_id, response.data.user_name, response.data.user_email, true));
                            dispatch(setTodoActionCreator(res.data));
                        } else {alert('ошибка получения списка дел')}
                    });
                } else {alert('неверный логин или пароль')}
            });
        }
   });
    setTimeout(()=>{
        dispatch(isFetchingActionCreator(false));
    }, 1000);
};

export default registrationReducer;