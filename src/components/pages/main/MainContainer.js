import React from "react";
import Main from "./Main";
import {connect} from "react-redux";
import {
    getUserActionCreator,
    onAddActionCreator,
    onAddedModeActionCreator,
    onDeletedActionCreator,
    onFilterStatusActionCreator,
    onRenameModeActionCreator,
    onSearchActionCreator,
    onToggleDoneActionCreator,
    onToggleImportantActionCreator,
    setTodoActionCreator,
    onToggleParamThunk,
    onAddThunk,
    onDeletedThunk,
    todoDefault
} from '../../../redux/mainReducer';
import Preloader from "../../../common/Preloader/Preloader";


class MainContainer extends React.Component {



    render() {
        return (
            (this.props.isFetching) ?
                <Preloader/> :
                <Main todo={this.props.todo}
                      isAuth={this.props.isAuth}
                      user_id={this.props.user_id}
                      user={this.props.user}
                      addedMode={this.props.addedMode}
                      onAddedMode={this.props.onAddedMode}
                      phrase={this.props.phrase}
                      onSearchChenge={this.props.onSearchChenge}
                      onStatus={this.props.onStatus}
                      onToggleDone={this.props.onToggleDone}
                      onToggleImportant={this.props.onToggleImportant}
                      onAdd={this.props.onAdd}
                      onRenameMode={this.props.onRenameMode}
                      onDeleted={this.props.onDeleted}
                      unLogin={this.props.unLogin}
                      {...this.props}
                />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        todo: state.mainPage.todo,
        isAuth:state.mainPage.isAuth,
        user_id: state.mainPage.user_id,
        user: state.mainPage.user,
        addedMode: state.mainPage.addedMode,
        phrase: state.mainPage.phrase,
        filterStatus: state.mainPage.filterStatus,
        done: state.mainPage.done,
        important: state.mainPage.important,
        isFetching: state.mainPage.isFetching
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        onSearchChenge: (phrase) => {
            dispatch(onSearchActionCreator(phrase));
        },
        onStatus: (filter) => {
            dispatch(onFilterStatusActionCreator(filter));
        },
        onToggleDone: (isAuth, id, done, user_id, param) => {
            if(isAuth) {
                dispatch(onToggleParamThunk(id, done, user_id, param))
            } else {
                dispatch(onToggleDoneActionCreator(id, done));
            }
        },
        onToggleImportant: (isAuth, id, important, user_id, param) => {
            if(isAuth) {
                dispatch(onToggleParamThunk(id, important, user_id, param))
            } else {
                dispatch(onToggleImportantActionCreator(id, important));
            }
        },
        onDeleted: (isAuth, id, user_id) => {
            if(isAuth) {
                dispatch(onDeletedThunk(id, user_id));
            } else {
                dispatch(onDeletedActionCreator(id));
            }
        },
        onAddedMode: (addedMode) => {
            dispatch(onAddedModeActionCreator(addedMode));
        },
        onRenameMode: (isAuth, id, data, user_id, param) => {
            if(isAuth) {
                dispatch(onToggleParamThunk(id, data, user_id, param))
            } else {
                dispatch(onRenameModeActionCreator(id, data));
            }
        },
        onAdd: (isAuth, user_id, data) => {
            if(isAuth) {
                dispatch(onAddThunk(user_id, data))
            } else {
                dispatch(onAddActionCreator(data));
            }
        },
        unLogin: () => {
            dispatch(getUserActionCreator(null,'guest', '', false));
            dispatch(setTodoActionCreator(todoDefault));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
