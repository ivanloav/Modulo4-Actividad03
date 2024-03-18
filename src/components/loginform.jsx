import './loginform.css';             // Importa los estilos del componente LoginForm

// Importa React y el hook useState de React
import React, { useState } from 'react';

// Define y exporta la función LoginForm
export function LoginForm({ onLoginSuccess }) {
  // Define el estado para el correo electrónico, la contraseña y el error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Define la función que se ejecutará cuando se envíe el formulario
  const handleSubmit = async (event) => {
    // Previene la recarga de la página al enviar el formulario
    event.preventDefault();

    // Resetea el estado de error en cada envío
    setError(false);

    // Construye el objeto de datos del formulario
    const loginData = {
      email: email,
      password: password
    };

    // Configura las opciones de la solicitud fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    };

    // Realiza la solicitud a la API
    try {
      const response = await fetch('https://reqres.in/api/login', requestOptions);
      const data = await response.json();
  
      // Si la respuesta no es exitosa, lanza un error
      if (!response.ok) {
        throw new Error(data.error);
      }
  
      // Si el login es exitoso, llama a onLoginSuccess
      onLoginSuccess();
    } catch (err) {
      // Si hay un error, actualiza el estado para mostrar un error visual
      setError(true);
      // Muestra un mensaje de alerta con el error
      alert('Error de inicio de sesión: ' + err.message);
    }
  };

  // Renderiza el formulario
  return (
    <form className='formLogin' onSubmit={handleSubmit}>
        <h1>Introduce tus credenciales para iniciar sesión</h1>
        <div className='inputsButtonContainer'>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderColor: error ? 'red' : 'default' }}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderColor: error ? 'red' : 'default' }}
                placeholder="Password"
            />
            <button type="submit">🔑&nbsp;&nbsp;&nbsp;Login</button>
        </div>
    </form>
  );
}