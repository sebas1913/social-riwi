const nameContainer = document.querySelector(".name");
const user = JSON.parse(localStorage.getItem("user"));

nameContainer.textContent = user.name;


