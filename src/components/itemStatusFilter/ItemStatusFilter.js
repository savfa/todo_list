import React from 'react';
import './itemStatusFilter.css'

const ItemStatusFilter = ({filterStatus, onStatus}) => {
    return(
        <div className='btn-group ItemStatusFilter' >
            <button onClick={()=>(onStatus('all'))} className={(filterStatus==='all') ? `btn btn-primary`: `btn btn-outline-secondary`}>All</button>

            <button onClick={()=>(onStatus('active'))} className={(filterStatus==='active') ? `btn btn-primary`: `btn btn-outline-secondary`}>Active</button>
            <button onClick={()=>(onStatus('done'))} className={(filterStatus==='done') ? `btn btn-primary`: `btn btn-outline-secondary`}>Done</button>
        </div>
    );
}

export default ItemStatusFilter;