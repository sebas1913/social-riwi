import { post, get } from "./clientHTTP.js";
import { URL_USERS } from "./URLS.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerButton = document.getElementById("register");
  const loginButton = document.getElementById("login");
  const container = document.getElementById("container");

  registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  const formLogin = document.getElementById("formLogin");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();
    const response = await fetch(`${URL_USERS}?email=${email.value}`);
    const data = await response.json();

    if (data.length === 0) {
      console.error("No existe un usuario con ese email");
      alert("No existe un usuario con ese email");
      return;
    }

    if (data[0].password !== password.value) {
      console.error("Password incorrecta");
      alert("Password incorrecta");
      return;
    }

    console.log("correcto");
    localStorage.setItem("user", JSON.stringify(data[0]));
    window.location.href = "feed.html";
  });

  const formRegister = document.getElementById("formRegister");
  const registerName = document.getElementById("registerName");
  const registerEmail = document.getElementById("registerEmail");
  const registerPassword = document.getElementById("registerPassword");

  formRegister.addEventListener("submit", async function (event) {
    event.preventDefault();
    
    // Verificar si el usuario ya existe
    const existingUserResponse = await get(`${URL_USERS}?email=${registerEmail.value}`);
    if (existingUserResponse.length > 0) {
      const alertDiv = document.createElement("div");
      alertDiv.classList.add("alert");
      alertDiv.innerText = "¡El usuario ya está registrado! Intenta con otro email.";
      
      // Insertar el mensaje de alerta antes del formulario de registro
      formRegister.parentNode.insertBefore(alertDiv, formRegister.nextSibling);
      
      // Detener la ejecución para evitar que se envíe el formulario
      return;
    }

    const user = {
      name: registerName.value,
      email: registerEmail.value,
      password: registerPassword.value,
    };

    const response = await post(URL_USERS, user);
    if (response.ok) {
      console.log("User registered successfully");
      container.classList.remove("right-panel-active");
    } else {
      console.error("Failed to register user");
    }
  });

});
