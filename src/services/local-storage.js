const KEY = "credentials";

export function readFromLocalStorage() {
  const storedCredentials = localStorage.getItem(KEY);

  if (storedCredentials) {
    try {
      return JSON.parse(storedCredentials);
    } catch (error) {
      console.error("Error al leer las credenciales del localStorage:", error);
    }
  }
}

export function writeToLocalStorage(credentials) {
  try {
    localStorage.setItem(KEY, JSON.stringify(credentials));
  } catch (error) {
    console.error(
      "Error al escribir las credenciales en el localStorage:",
      error
    );
  }
}
