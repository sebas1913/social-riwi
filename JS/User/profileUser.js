import { URL_POST, URL_USERS } from "../URLS.js";


const nameContainer = document.querySelector(".name");
const user = JSON.parse(localStorage.getItem("user"));
const emailContainer = document.querySelector(".email");
const skillsContainer = document.querySelector(".skills");
nameContainer.textContent = user.name;
emailContainer.textContent = user.email;
skillsContainer.textContent = user.skills;

// Variables del DOM
const postsContainer = document.querySelector("#publications-container");


// Función para obtener publicaciones del servicio JSON
async function getPosts(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

// Función para obtener usuarios del servicio JSON
async function getUsers(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

// Función para mostrar una publicación en el DOM
function showPublication(publicacion) {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    
    // Verificar si el email de la publicación coincide con el email del usuario actual
    if (publicacion.email === currentUser.email) {
        let newPost = document.createElement("div");
        newPost.classList.add("content");
        newPost.dataset.id = publicacion.id; 
        newPost.innerHTML = `
            <button class="delete">❌</button>
            <h3>${publicacion.user}</h3>
            <h4>${publicacion.comment}</h4>
            <p>${publicacion.time}</p>
            <img src="${publicacion.image}" alt="Imagen del estudiante">

        `;
        postsContainer.appendChild(newPost);
    }
}

// Mostrar las publicaciones al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const [publicaciones, usuarios] = await Promise.all([getPosts(URL_POST), getUsers(URL_USERS)]);
    
    // Filtrar las publicaciones por el email del usuario actual
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const userPosts = publicaciones.filter(post => post.email === currentUser.email);

    // Invertir el orden de las publicaciones
    userPosts.reverse();

    // Mostrar las publicaciones filtradas
    userPosts.forEach(publication => {
        showPublication(publication);
    });

    postsContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete')) {
            const postId = e.target.parentElement.dataset.id; // Get ID publication
            const confirmation = confirm("Are you sure you want to delete this publication??");
            if (confirmation) {
                // Remove publication from the DOM
                e.target.parentElement.remove();
                
                // Remove publication from JSON service
                const response = await fetch(`${URL_POST}/${postId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    console.error('Error :(');
                }
            }
        }
    });
});
