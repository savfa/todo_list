import React from "react";
import Header from "../../header";
import ItemStatusFilter from "../../itemStatusFilter";
import TodoList from "../../todoList";
import TodoListItemAddForm from "../../forms/todoListItemAddForm";
import SearchPanel from "../../searchPanel";
import {CSSTransition} from "react-transition-group";
import '../../forms/todoListItemAddForm/todoListItemAddForm.css';



const Main = ({todo, isAuth, user_id, user, addedMode, onAddedMode, phrase, onSearchChenge, filterStatus, onStatus, onToggleDone, onToggleImportant, onDeleted, onAdd,
                  renameMode, onRenameMode, unLogin
              }) => {
    return (
        <React.Fragment>
            <div className="col-12">
                <Header user={user} todo={todo} isAuth={isAuth} unLogin={unLogin}/>
            </div>
            <div className="col-12">
                <div className='d-flex justify-content-between'
                     style={{width: '100%', margin: '0 0 10px 0'}}>
                    <SearchPanel phrase={phrase}
                                 onSearchChenge={onSearchChenge}
                    />
                    <ItemStatusFilter filterStatus={filterStatus}
                                      onStatus={onStatus}
                    />
                </div>
            </div>
            <div className="col-12">
                <TodoList todo={todo}
                          isAuth={isAuth}
                          user_id={user_id}
                          phrase={phrase}
                          filterStatus={filterStatus}
                          onToggleDone={onToggleDone}
                          onToggleImportant={onToggleImportant}
                          onDeleted={onDeleted}
                          onAddedMode={onAddedMode}
                          addedMode={addedMode}
                          renameMode={renameMode}
                          onRenameMode={onRenameMode}
                />
                    <CSSTransition in={addedMode} timeout={1000} classNames="addForm">
                        <TodoListItemAddForm addedMode={addedMode} onSubmit={(data)=> {onAdd(isAuth, user_id, data)}}/>
                    </CSSTransition>

            </div>
        </React.Fragment>
    );

};

export default Main;