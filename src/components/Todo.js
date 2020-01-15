import React from 'react'

export default function Todo({todo,toggleTodos}) {
    function handleTodosClick(){
        toggleTodos(todo.id);
    }
    return (
        <div>
            <input type="checkbox" checked={todo.complete} onChange={handleTodosClick}/>
            {todo.name}
        </div>
    )
}
