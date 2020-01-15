import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import TodoList from './TodoList';
import uuidV4 from 'uuid/v4'

export default function Todos() {
    const LOCAL_STORAGE_KEY="todoApp.todos";
    const [todos, setTodos] = useState([ ]);
    const todoNameRef = useRef();                    
    useEffect(()=>{
      const localTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log( 'Get: ' + JSON.parse(localTodos));
      setTodos(JSON.parse(localTodos));    
    },[]) ; //Since array is empty it will be called once. 
    
    useEffect(()=>{
      console.log( 'Save' + JSON.stringify(todos));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    },[todos]); //It will be called everytime todos [] change.
    
    function toggleTodos(id){
      const newTodos = [...todos];
      const todo = newTodos.find( todo => todo.id === id );
      todo.complete =  !todo.complete;
      setTodos(newTodos);
    }
    function handleAddTodo(){
      const name = todoNameRef.current.value;
      todoNameRef.current.value = null;
      setTodos(prevTodos => {
        return [...prevTodos, {id: uuidV4(), name: name, complete: false} ]
      });
  
    }                              
    function handleClearTodos(){
      const newTodos = [...todos];
      setTodos( newTodos.filter( todo => !todo.complete ) );
    }      
    return (
      <>
        <h1>ToDos</h1>
        <TodoList todos={todos} toggleTodos={toggleTodos} />
        <input ref={todoNameRef} type="text" />
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleClearTodos}>Clear Todos</button>
        <div>
            {todos.filter( todo => !todo.complete ).length} left Todo
        </div>
      </>
    );
}
