import { useState } from "react";
import './todolist.css';
import { TodoItem } from './todoitem';

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        isCompleted: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    } else {
      alert('Por favor, escribe algo para agregar a la lista.');
    }
  };
  const toggleTodoCompletion = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  return (
    <>
        <div className="toDoContainer">
            <div className="toDoItem">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={deleteTodo}
                        onComplete={toggleTodoCompletion}
                        onUpdate={updateTodo}
                    />
                ))}
            </div>
            <div className="toDoInput">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    type="text" />
                <button onClick={addTodo}>➕</button>
            </div>
        </div>
    </>
  );
}
