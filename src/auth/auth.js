let error = [];

// Función para validar la contraseña
function validHashPass(pass) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(pass);
}

// Función para validar el correo electrónico
function validEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Función para validar el nombre de usuario
function validUsername(username) {
  const regex = /^[a-zA-Z0-9_]{3,16}$/;
  return regex.test(username);
}

// Función para validar el formulario
function validateForm(username, email, password) {
  error = [];
  if (!validUsername(username)) {
    error.push(
      "El nombre de usuario debe tener entre 3 y 16 caracteres y solo puede contener letras, números y guiones bajos."
    );
  }
  if (!validEmail(email)) {
    error.push("El correo electrónico no es válido.");
  }
  if (!validHashPass(password)) {
    error.push(
      "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número."
    );
  }
  return error;
}

// Funcion de comparacion de contraseñas
function comparingPasswords(password, confirmPassword) {
  let isValid = true;

  if (password !== confirmPassword) {
    isValid = false;
  }

  return isValid;
}

// simulacion de endpoint para registrar datos de un usuario
export function createUser(username, email, password, confirmPassword) {
  const errors = validateForm(username, email, password, confirmPassword);
  if (errors.length > 0) {
    throw new Error(errors.join(" "));
  }

  if (!comparingPasswords(password, confirmPassword)) {
    throw new Error("Las contraseñas no coinciden.");
  }

  // Aquí iría la lógica para crear el usuario
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const newUser = {};

  newUser.username = username;
  newUser.email = email;
  newUser.password = password;

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem(
    "isActive",
    JSON.stringify({ username, active: true })
  );

  window.location.reload();
  return {
    username,
    email,
  };
}

// Simulación de endpoint para iniciar sesión
export function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.username === username);

  
  if (!user) {
    return { message: "No encontramos el usuario.", valid: false };
  }

  if (comparingPasswords(user.password, password)) {
    throw new Error("Contraseña incorrecta.");
  }

  localStorage.setItem("isActive", JSON.stringify({ username, active: true }));

  window.location.reload();
  return {
    username: user.username,
    email: user.email,
    valid: true,
  };
}

export function logoutUser() {
  localStorage.setItem(
    "isActive",
    JSON.stringify({
      active: false,
    })
  );

  window.location.reload();
}
