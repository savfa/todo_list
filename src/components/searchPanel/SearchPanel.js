import React from "react";
import './searchPanel.css'

const SearchPanel = ({phrase, onSearchChenge}) => {
    return (
        <form className='AppSearchPanel'>
            <input type="text"
                   className='form-control'
                   placeholder={'Найти дело'}
                   value={phrase}
                   onChange={(e)=>{onSearchChenge(e)}}
            />
        </form>
    )
}

export default SearchPanel;