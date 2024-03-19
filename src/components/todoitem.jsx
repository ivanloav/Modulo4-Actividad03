import './todoitem.css';                  // Importa los estilos del componente TodoItem
import React, { useState } from 'react';  // Importa React y el hook useState de React

// Define y exporta la función TodoItem
export function TodoItem({ todo, onDelete, onComplete, onUpdate }) {
  // Define el estado para si se está editando y el texto de edición
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  // Define la función para iniciar la edición
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Define la función para guardar la edición
  const handleSave = () => {
    onUpdate(todo.id, editText);
    setIsEditing(false);
  };

  // Define la función para cancelar la edición
  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  // Renderiza el componente
  return (
    <div className={`addItem ${todo.isCompleted ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onComplete(todo.id)}
        className="custom-checkbox"
      />
      {isEditing ? (
        <>
          <input className='editInput'
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave}>✅</button>
          <button onClick={handleCancel}>❌</button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <button onClick={handleEdit} disabled={todo.isCompleted}>✏️</button>
          <button onClick={() => {
                if (window.confirm(`¿Estás segur@ de que quieres eliminar la tarea ${todo.text}?`)) {
                    onDelete(todo.id)
                }
            }}>🗑️</button>
        </>
      )}
    </div>
  );
}