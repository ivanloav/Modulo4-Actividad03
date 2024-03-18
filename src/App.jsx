import './App.css';
import { useState } from 'react';
import { TodoList } from './components/todolist';
import { LoginForm } from './components/loginform';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1>Lista de tareas</h1>
          <TodoList />
        </>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;
