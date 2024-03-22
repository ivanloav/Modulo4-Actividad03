import './loginform.css';                      // Importa los estilos del componente LoginForm 
import { useState, useEffect } from 'react';   // Importa useState y useEffect de React

export function LoginForm({ onLoginSuccess }) {
  const [rememberMe, setRememberMe] = useState(false);                                // Estado para recordar las credenciales
  const [error, setError] = useState(false);                                          // Estado para mostrar un error visual
  const [credentials, setCredentials] = useState({ email: '', password: '' });        // Estado para las credenciales
  const [isLoading, setIsLoading] = useState(false);                                  // Estado para mostrar el indicador de carga

  const setEmail = (email) => setCredentials(prev => ({ ...prev, email }));           // Función para actualizar el email
  const setPassword = (password) => setCredentials(prev => ({ ...prev, password }));  // Función para actualizar la contraseña

  // Función para cargar las credenciales almacenadas en localStorage al montar el componente
  useEffect(() => {
    const storedCredentials = localStorage.getItem('credentials'); // Obtiene las credenciales almacenadas en localStorage
    // Si hay credenciales almacenadas, las carga en el estado
    if (storedCredentials) {
      const parsedCredentials = JSON.parse(storedCredentials);                                      // Parsea las credenciales almacenadas
      setCredentials({ email: parsedCredentials.username, password: parsedCredentials.password });  // Actualiza el estado con las credenciales almacenadas
      setRememberMe(true);                                                                          // Marca el checkbox de recordar credenciales
    }
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    setIsLoading(true);     // Comienza a mostrar el indicador de carga

    // Función asíncrona para simular el inicio de sesión con una espera de 1 segundo
    setTimeout(async () => {
      // Si el checkbox de recordar credenciales está marcado, guarda las credenciales en localStorage si no esta marcado, las elimina
      if (rememberMe) {
        localStorage.setItem('credentials', JSON.stringify({ username: credentials.email, password: credentials.password }));
      } else {
        localStorage.removeItem('credentials');
      }
      // Actualiza el estado para no mostrar un error visual
      setError(false);

      // Intenta iniciar sesión con las credenciales proporcionadas
      try {
        // Realiza una petición POST a la API de ReqRes para iniciar sesión
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: credentials.email, password: credentials.password })
        };
        // Espera la respuesta de la petición
        const response = await fetch('https://reqres.in/api/login', requestOptions);
        const data = await response.json();
        
        // Si la respuesta no es exitosa, lanza un error con el mensaje de error de la API
        if (!response.ok) {
          throw new Error(data.error);
        }
        
        onLoginSuccess();                                   // Llama a onLoginSuccess si el inicio de sesión es exitoso
      } catch (err) {                                       // Captura cualquier error que ocurra durante el inicio de sesión
        setError(true);                                     // Actualiza el estado para mostrar un error visual
        alert('Error de inicio de sesión: ' + err.message); // Muestra un mensaje de alerta con el error
      }
      
      setIsLoading(false);                                  // Oculta el indicador de carga
    }, 1000);                                               // Espera 1 segundo antes de ejecutar la lógica de inicio de sesión
  };

  // Renderiza el componente
  return (
    <div>
      {isLoading && (
        <div className="loadingOverlay">
          <div className="spinner"></div>
        </div>
      )}
      <form className='formLogin' onSubmit={handleSubmit}>
        <h1>Introduce tus credenciales para iniciar sesión</h1>
        <div className='inputsButtonContainer'>
          <input
            type="email"
            value={credentials.email}
            onChange={e => setEmail(e.target.value)}
            style={{ borderColor: error ? 'red' : 'default' }}
            placeholder="Email"
          />
          <input
            type="password"
            value={credentials.password}
            onChange={e => setPassword(e.target.value)}
            style={{ borderColor: error ? 'red' : 'default' }}
            placeholder="Password"
          />
          <label className='rememberMe-container'>
            Recordar credenciales
            <input
              className='rememberMe-checkbox'
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
          </label>
          <button type="submit">🔑&nbsp;&nbsp;&nbsp;Login</button>
        </div>
      </form>
    </div>
  );
}
