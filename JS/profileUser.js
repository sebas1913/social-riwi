const nameContainer = document.querySelector(".name");
const emailContainer = document.querySelector(".email");
const user = JSON.parse(localStorage.getItem("user"));
const email = JSON.parse(localStorage.getItem("user"));

nameContainer.textContent = user.name;
emailContainer.textContent = user.email;


