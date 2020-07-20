import {authAPI} from "../api/api";
import {getUserActionCreator, isFetchingActionCreator, setTodoActionCreator} from "./mainReducer";




const loginReducer = (state = {}, action) => {
    return state;
};

export const loginThunk = (data) => (dispatch) => {
    dispatch(isFetchingActionCreator(true));

    authAPI.login(data).then(response => {
        if (response.status === 200 && response.data) {
            // success
            dispatch(getUserActionCreator(response.data.user_id, response.data.user_name, response.data.user_email, true));
            authAPI.userIDTodoData(response.data.user_id).then(res => {
                if (res.status === 200) {
                    dispatch(setTodoActionCreator(res.data));
                } else {alert('ошибка получения списка дел')}
            });
        } else {alert('неверный логин или пароль')}
    });

    setTimeout(()=>{
        dispatch(isFetchingActionCreator(false));
    }, 1000)
};

export default loginReducer;