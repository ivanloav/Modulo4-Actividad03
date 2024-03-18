import './App.css';                                 // Importa los estilos de la aplicación
import { useState } from 'react';                   // Importa el hook useState de React
import { TodoList } from './components/todolist';   // Importa el componente TodoList
import { LoginForm } from './components/loginform'; // Importa el componente LoginForm

// Define y exporta la función App
function App() {
  // Define el estado para si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Define la función para manejar el éxito del login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Renderiza el componente
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