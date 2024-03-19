import './todolist.css';                // Importa los estilos del componente TodoList
import { useState } from "react";       // Importa el hook useState de React
import { TodoItem } from './todoitem';  // Importa el componente TodoItem

// Define y exporta la función TodoList
export function TodoList() {
  // Define el estado para los todos y el valor del input
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Define la función para agregar un todo
  const addTodo = () => {
    // Solo agrega el todo si el input no está vacío
    if (inputValue.trim() !== '') {
      // Crea un nuevo todo
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        isCompleted: false
      };
      // Agrega el nuevo todo a la lista de todos
      setTodos([...todos, newTodo]);
      // Limpia el input
      setInputValue('');
    } else {
      // Si el input está vacío, muestra una alerta
      alert('Por favor, escribe algo para agregar a la lista.');
    }
  };

  // Define la función para marcar un todo como completado o no completado
  const toggleTodoCompletion = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  // Define la función para eliminar un todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Define la función para actualizar el texto de un todo
  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  // Renderiza el componente
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
                <form onSubmit={(e) => {
                        e.preventDefault();
                        addTodo();
                    }}>
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text" 
                    />
                    <button type="submit">➕</button>
                </form>
            </div>
        </div>
    </>
  );
}