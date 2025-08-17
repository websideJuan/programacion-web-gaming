import { createModal, showModal } from "./scripts/modal.js";
import { loginUser, createUser, logoutUser } from "./auth/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  //Verificacion de usuario activo,
  const isActive = JSON.parse(localStorage.getItem("isActive"));
  const cartStorage = JSON.parse(localStorage.getItem("cartStorage")) || [];
  const userActive = document.getElementById("userActive");
  if (isActive && isActive.active) {
    // Si hay un usuario activo, redirigir o mostrar información
    userActive.innerHTML = `
    <div class="dropdown">
      <button class="btn btn-secondary bg-transparent border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        ${isActive.username}
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item logout">
          <i class="fa-solid fa-right-from-bracket"></i>
          Cerrar sesión
        </a></li>
      </ul>
    </div>
    `;


    // Mostrar el contenido del carrito si hay elementos
    const cartItemsContainer = document.getElementById("cartItems");
    if (cartItemsContainer) {
      if (cartStorage.length > 0) {
        cartItemsContainer.innerHTML = cartStorage
          .map(
            (item) => `
          <div class="col-12">
            <div class="cart-item d-flex flex-column justify-content-between align-items-center">
              <div class="cart-item-info">
                <h5 class="text-white">${item.name}</h5>
                <p class="text-thin">Cantidad: ${item.quantity}</p>
              </div>
              <div class="cart-item-price">
                <p class="text-white">$${item.price * item.quantity}</p>
              </div>
            </div>
          </div>
        `
          )
          .join("");
      }
    }
  }

  // Clic en el botón de inicio de sesión
  const loginButton = document.getElementById("loginButton");

  if (loginButton) {
    loginButton.addEventListener("click", () => {
      const modal = createModal({
        body: `
        <div class="container">
          <div class="">
            <h5 class="title">
              Cuenta
            </h5>
          </div>
          <div>
            <div>
              <p>Inicia sesión para acceder a tu cuenta.</p>
              <div>
                <ul class="list-inline d-grid grid-cols-1 gap-3">
                  <li class="d-flex justify-content-center align-items-center ">
                    <button class="btn btn-outline-primary w-100 login">
                      <img src="/src/assets/icon/simbolo-de-google.png" alt="Google" />
                      Inicia session Google
                    </button>
                  </li>
                  <li class="d-flex justify-content-center align-items-center ">
                    <button class="btn btn-outline-primary w-100">
                      <img src="/src/assets/icon/simbolo-de-xbox.png" alt="Xbox" />
                      <span class="ms-2">Iniciar session Xbox</span>
                    </button>
                  </li>
                  <li class="d-flex justify-content-center align-items-center ">
                    <button class="btn btn-outline-primary w-100">
                      <img src="/src/assets/icon/simbolo-de-steam.png" alt="Steam" />
                      <span class="ms-2">Inicia session Steam</span>
                    </button>
                  </li>
                </ul>

              </div>
              <div class="text-center mt-3">
                <div>
                  o<br> inicia sesión como
                  <a class="guest">invitado</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
        id: "accountModal",
      });
      showModal(modal);
    });
  }
  // Delegacion de eventos en el documento, para poder dar click en los enlaces de forma dinamica
  document.addEventListener("click", (event) => {
    // Clicks en links de inicio de sesión, registro y como invitado.
    if (event.target.classList.contains("login")) {
      
      document.querySelector(".modal-backdrop").remove();
      const loginModal = createModal({
        title: "Iniciar sesión",
        body: `
          <form id="loginForm">
            <div class="mb-3">
              <label for="username" class="form-label">Nombre de usuario</label>
              <input type="text" class="form-control" id="username" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Iniciar sesión</button>
          </form>
          <div class="d-flex justify-content-between mt-3">
            <div>
              <a class="guest">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div>
              <a class="register">Regístrate</a>
            </div>
          </div>
        `,
        id: "loginModal",
      });

      showModal(loginModal);
      const loginForm = document.getElementById("loginForm");
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        //
        try {
          const username = document.getElementById("username").value;
          const password = document.getElementById("password").value;
          const res = loginUser(username, password);

          if (!res.valid) {
            const redirectModal = createModal({
              title: "Error",
              body: res.message,
              footer: `
                <a href="#" id="redirectRegister" class="register">Regístrate!</a>
              `,
              id: "errorModal",
            });

            showModal(redirectModal);
            return;
          }
        } catch (error) {
          console.log(error.message);
        }
      });
    } else if (event.target.classList.contains("register")) {
      const registerModal = createModal({
        title: "Registrarse",
        body: `
          <form id="registerForm">
            <div class="mb-3">
              <label for="newUsername" class="form-label">Nombre de usuario</label>
              <input type="text" class="form-control" id="newUsername" required>
            </div>
            <div class="mb-3">
              <label for="newEmail" class="form-label">Correo electrónico</label>
              <input type="email" class="form-control" id="newEmail" required>
            </div>
            <div class="mb-3">
              <label for="newPassword" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="newPassword" required>
            </div>
            <div class="mb-3">
              <label for="newConfirmPassword" class="form-label">Confirmar contraseña</label>
              <input type="password" class="form-control" id="newConfirmPassword" required>
            </div>
            <button type="submit" class="btn btn-primary">Registrarse</button>
          </form>
        `,
        id: "registerModal",
      });
      showModal(registerModal);

      const registerForm = document.getElementById("registerForm");
      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const newUsername = document.getElementById("newUsername").value;
        const newEmail = document.getElementById("newEmail").value;
        const newPassword = document.getElementById("newPassword").value;
        const newConfirmPassword =
          document.getElementById("newConfirmPassword").value;

        try {
          const res = createUser(
            newUsername,
            newEmail,
            newPassword,
            newConfirmPassword
          );
          console.log("Usuario creado:", res);
        } catch (error) {
          console.error("Error al crear usuario:", error);
        }
      });
    } else if (event.target.classList.contains("resetPassword")) {
      // Lógica para restablecer la contraseña
    } else if (event.target.classList.contains("guest")) {
      // Lógica para iniciar sesión como invitado
    } else if (event.target.classList.contains("logout")) {
      // Lógica para cerrar sesión
      logoutUser();
    } else {
      return;
    }

    document.querySelector(".modal-backdrop").remove();
  });
});
