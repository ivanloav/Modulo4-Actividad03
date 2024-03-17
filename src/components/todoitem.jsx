import React, { useState } from 'react';
import './todoitem.css';

export function TodoItem({ todo, onDelete, onComplete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

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
          <button onClick={handleEdit}>✏️</button>
          <button onClick={() => onDelete(todo.id)}>🗑️</button>
        </>
      )}
    </div>
  );
}

