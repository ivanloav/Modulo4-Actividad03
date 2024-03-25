export async function postLogin(credentials) {
  // Configurar las opciones de la petición
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  };

  // Realizar la petición a la API
  const response = await fetch("https://reqres.in/api/login", requestOptions);

  if (!response.ok) {
    throw new Error(data.error);
  }

  const data = await response.json();
  return data;
}
