import './loginform.css';             // Importa los estilos del componente LoginForm

// Importa React y el hook useState de React
import React, { useState, useEffect } from 'react';

// Define y exporta la función LoginForm
export function LoginForm({ onLoginSuccess }) {
  const [rememberMe, setRememberMe] = useState('');
  const [error, setError] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const setEmail = (email) => setCredentials(prev => ({ ...prev, email }));
  const setPassword = (password) => setCredentials(prev => ({ ...prev, password }));

  // Carga las credenciales almacenadas en localStorage al montar el componente
  useEffect(() => {
    const storedCredentials = localStorage.getItem('credentials');
    if (storedCredentials) {
      const parsedCredentials = JSON.parse(storedCredentials);
      setCredentials({ email: parsedCredentials.username, password: parsedCredentials.password });
      setRememberMe(true);
    }
  }, []);

  // Define la función que se ejecutará cuando se envíe el formulario
  const handleSubmit = async (event) => {
    // Previene la recarga de la página al enviar el formulario
    event.preventDefault();

    if (rememberMe) {
      localStorage.setItem('credentials', JSON.stringify({ username: credentials.email, password: credentials.password }));
    } else {
      localStorage.removeItem('credentials');
    }

    // Resetea el estado de error en cada envío
    setError(false);

    // Construye el objeto de datos del formulario
    const loginData = {
      email: credentials.email,
      password: credentials.password
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
                value={credentials.email}
                // value='eve.holt@reqres.in'
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderColor: error ? 'red' : 'default' }}
                placeholder="Email"
            />
            <input
                type="password"
                value={credentials.password}
                // value='cityslicka'
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderColor: error ? 'red' : 'default' }}
                placeholder="Password"
            />
            <label className='rememberMe-container'>
              Recordar credenciales
              <input
                className='rememberMe-checkbox'
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </label>
            <button type="submit">🔑&nbsp;&nbsp;&nbsp;Login</button>
        </div>
    </form>
  );
}