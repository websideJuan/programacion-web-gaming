import { createModal, showModal } from "./scripts/modal.js";
import { loginUser } from "./auth/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");

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
                    <button class="btn btn-outline-primary w-100">
                      <img src="./src/assets/icon/simbolo-de-google.png" alt="Google" />
                      <span class="ms-2">Inicia session Google</span>
                    </button>
                  </li>
                  <li class="d-flex justify-content-center align-items-center ">
                    <button class="btn btn-outline-primary w-100">
                      <img src="./src/assets/icon/simbolo-de-xbox.png" alt="Xbox" />
                      <span class="ms-2">Inicia session Xbox</span>
                    </button>
                  </li>
                  <li class="d-flex justify-content-center align-items-center ">
                    <button class="btn btn-outline-primary w-100">
                      <img src="./src/assets/icon/simbolo-de-steam.png" alt="Steam" />
                      <span class="ms-2">Inicia session Steam</span>
                    </button>
                  </li>
                </ul>

              </div>
              <div class="text-center mt-3">
                <div>
                  Inicio de session normal
                  <a class="login" href="#">Inicia sesión</a>
                </div>
                <div>
                  o<br> inicia sesión como invitado
                  <a class="guest" href="#">Inicia sesión como invitado</a>
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

  document.addEventListener("click", (event) => {
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
          <div class="text-center mt-3">
            <div>
              o<br> inicia sesión como invitado
              <a class="guest" href="#">Inicia sesión como invitado</a>
              Registrate!
              <a class="register" href="#">Regístrate</a>
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

            showModal(redirectModal)
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
              <label for="newPassword" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="newPassword" required>
            </div>
            <button type="submit" class="btn btn-primary">Registrarse</button>
          </form>
        `,
        id: "registerModal",
      });
      showModal(registerModal);
    } else {
      return;
    }
      document.querySelector(".modal-backdrop").remove();

  });
});
