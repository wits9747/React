import React from 'react'

const TodoItem = ({todo, onToggle, onRemove}) => {
    let {no, name, status} = todo;
    return (
        <li className='todoItem' key={todo.key}>
            <div className="item">
                <input type="checkbox" name="no" id={todo.no} checked={status} onChange={() => onToggle(todo)} />
                <label htmlFor={todo.no}></label>
                <span>{todo.name}</span>
            </div>
            <div className="item">
                <button className='btn' onClick={()=>onRemove(no)}>삭제</button>
            </div>
        </li>
    )
}

export default TodoItem