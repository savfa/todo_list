import React from "react";
import TodoListItem from "../todoListItem";
import './todoList.css';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const TodoList = ({isAuth, todo, phrase, filterStatus, onToggleDone, onDeleted, addedMode, onAddedMode, onToggleImportant, onUpdate,
                      renameMode, onRenameMode, user_id
                  }) => {
    switch (filterStatus) {
        case 'all':
            break;
        case 'active':
            todo = todo.filter(el => (el.done === 0));
            break;
        case 'done':
            todo = todo.filter(el => {
                return el.done === 1});
            break;
        default:
            break;
    }
    let  items = todo.filter(item => item.label.toLowerCase().indexOf(phrase.toLowerCase()) > -1).map((item)=> {

        const {id_todo, label, done, important} = item;

        return (
            <CSSTransition key={id_todo} timeout={500} classNames="item">
                <li key={id_todo} className='list-group-item d-flex justify-content-between align-items-center'>
                    <TodoListItem done={done}
                                  important={important}
                                  label={label}
                                  onToggleDone={()=>{onToggleDone(isAuth, id_todo, done, user_id, 'done')}}
                                  onToggleImportant={()=>{onToggleImportant(isAuth, id_todo, important, user_id, 'important')}}
                                  onDeleted={()=>{onDeleted(isAuth, id_todo, user_id)}}
                                  addedMode={addedMode}
                                  onAddedMode={onAddedMode}
                                  onUpdate={()=>{onUpdate(id_todo)}}
                                  renameMode={renameMode}
                                  onRenameMode={onRenameMode}
                                  id_todo={id_todo}
                                  isAuth={isAuth}
                                  user_id={user_id}
                    />
                </li>
            </CSSTransition>
        )
    });

    return (

        <div>
                <ul className='TodoList list-group'>
                    <TransitionGroup>
                        {items}
                    </TransitionGroup>
                </ul>
            <div className={`d-flex justify-content-end TodoList__btn`}>
                <button className='btn btn-outline-secondary' onClick={ ()=> {
                    onAddedMode(addedMode);
                }}>
                    <i className={addedMode ? 'fas fa-minus' : 'fas fa-plus'}></i>
                </button>
            </div>
        </div>
    )
}

export default TodoList;