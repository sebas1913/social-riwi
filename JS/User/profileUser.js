const nameContainer = document.querySelector(".name");
const user = JSON.parse(localStorage.getItem("user"));
const emailContainer = document.querySelector(".email");
const email = JSON.parse(localStorage.getItem("user"));
nameContainer.textContent = user.name;
emailContainer.textContent = user.email;

// Variables del DOM
const publicacionesContainer = document.querySelector("#publicaciones-container");

// URL del servicio JSON de publicaciones
const URL_POST = "http://localhost:3000/post";

// URL del servicio JSON de usuarios
const URL_USERS = "http://localhost:3000/users";

// Función para obtener publicaciones del servicio JSON
async function obtenerPublicaciones(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

// Función para obtener usuarios del servicio JSON
async function obtenerUsuarios(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

// Función para mostrar una publicación en el DOM
function mostrarPublicacion(publicacion) {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    
    // Verificar si el email de la publicación coincide con el email del usuario actual
    if (publicacion.email === currentUser.email) {
        let newPost = document.createElement("div");
        newPost.classList.add("contenido");
        newPost.innerHTML = `
            <h3>${publicacion.user}</h3>
            <h4>${publicacion.comentario}</h4>
            <p>${publicacion.tiempo}</p>
            <img src="${publicacion.imagen}" alt="Imagen del estudiante">
        `;
        publicacionesContainer.appendChild(newPost);
    }
}

// Mostrar las publicaciones al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const [publicaciones, usuarios] = await Promise.all([obtenerPublicaciones(URL_POST), obtenerUsuarios(URL_USERS)]);
    
    // Filtrar las publicaciones por el email del usuario actual
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const userPosts = publicaciones.filter(post => post.email === currentUser.email);

    // Invertir el orden de las publicaciones
    userPosts.reverse();

    // Mostrar las publicaciones filtradas
    userPosts.forEach(publicacion => {
        mostrarPublicacion(publicacion);
    });
});
