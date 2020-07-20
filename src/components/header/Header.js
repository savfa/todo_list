import React from "react";
import './header.css';
import Auth from "../auth";


const Header = ({user, todo, isAuth, unLogin}) => {
    let countDone = todo.filter(elem=>elem.done===1).length;
    return (
        <React.Fragment>
            <Auth user={user} isAuth={isAuth} unLogin={unLogin}/>
            <div className='AppHeader d-flex justify-content-between'>
                <h1>Список дел</h1>
                <p>{todo.length} дел, {countDone} выполнено</p>
            </div>
        </React.Fragment>
    )
}

export default Header;