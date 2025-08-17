let error = []

function validHashPass (pass) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(pass);
}

function validEmail (email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validUsername (username) {
  const regex = /^[a-zA-Z0-9_]{3,16}$/;
  return regex.test(username);
}

function validateForm( username, email, password ) {
  error = []
  if (!validUsername(username)) {
    error.push('El nombre de usuario debe tener entre 3 y 16 caracteres y solo puede contener letras, números y guiones bajos.')
  }
  if (!validEmail(email)) {
    error.push('El correo electrónico no es válido.')
  }
  if (!validHashPass(password)) {
    error.push('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número.')
  }
  return error
}

function comparingPasswords(password, confirmPassword) {
  if (password !== confirmPassword) {
    error.push('Las contraseñas no coinciden.')
    return error
  }
  return []
}

function cleanErrors() {
  return error = [];
}

export function createUser( username, email, password ) {
  const errors = validateForm({ username, email, password });
  if (errors.length > 0) {
    throw new Error(errors.join(' '));
  }
  // Aquí iría la lógica para crear el usuario
  const newUser = {}

  newUser.username = username;
  newUser.email = email;
  newUser.password = password;

  localStorage.setItem('users', JSON.stringify(newUser));
  localStorage.setItem('isActive', JSON.stringify({ [username]: true, userActive: newUser }));

  return {
    username,
    email
  };
}

export function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const user = users[username];

  if (!user) {
    return { message: 'No encontramos el usuario.', valid: false };
  }

  if (comparingPasswords(user.password, password)) {
    throw new Error('Contraseña incorrecta.');
  }

  localStorage.setItem('isActive', JSON.stringify({ [username]: true, userActive: user }));

  return {
    username: user.username,
    email: user.email,
    valid: true
  };
}
