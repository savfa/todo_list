import React, {useState} from "react";
import './todoListItem.css'
import RenameItemForm from "../forms/renameItemForm/RenameItemForm";

const TodoListItem = ({label, done, important, onToggleImportant, onDeleted,onToggleDone, id_todo,
                          onRenameMode, isAuth, user_id
}) => {
    const [rename, setRename] = useState(false);

    return (
        <>  {
                (rename) ?
                <RenameItemForm initialValues={{renameItem:label}}
                                onSubmit={(data)=> {
                                    onRenameMode(isAuth, id_todo, data.renameItem, user_id, 'label');
                                    setRename(!rename);
                                }}/>
                :
                <span className={`${done ?'done':null} ${important ?'important':null}`}
                      style={{cursor: 'pointer'}}
                      onClick={()=>onToggleDone()}>
                    {label}
                </span>
            }
            <div>
                <button className={`btn btn-outline-success ${important ?'btn_green':null}`}
                        onClick={()=>onToggleImportant()}>
                    <i className={`fas fa-exclamation ${important ? 'i_bg_white' : null}`}></i>
                </button>
                <button className='btn btn-outline-primary'
                        onClick={()=>setRename(!rename)}>
                    <i className='fas fa-pencil-alt'></i>
                </button>
                <button className='btn btn-outline-danger'
                        onClick={()=>onDeleted()}>
                    <i className='fas fa-trash-alt'></i>
                </button>
            </div>
        </>
)
}
export default TodoListItem;