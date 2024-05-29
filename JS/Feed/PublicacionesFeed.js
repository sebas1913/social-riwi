import { URL_POST } from "../URLS.js";

const post = document.querySelector("#post");
const postsContainer = document.querySelector("#publications-container");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const upload = document.getElementById("upload");
let botonGenerarPost = true;

// Función para obtener el tiempo actual en un formato legible
function getCurrentTime() {
    const ahora = new Date();
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return ahora.toLocaleDateString('en-US', opciones);
}



// Función para obtener publicaciones del servicio JSON
async function getPosts(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

// Función para crear una nueva publicación en el servicio JSON y en el DOM
async function createPublication(URL, nuevaPublicacion) {
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaPublicacion),
    });
    return response;
}

// Función para mostrar una publicación en el DOM
function showPublication(publications) {
    // Traemos el item de la sesión del usuario
    const user = JSON.parse(localStorage.getItem("user"));

    // Traemos el item del número de reacciones de la publicación
    const reactions = JSON.parse(localStorage.getItem('reactions')) || {};
    const reaccionCount = reactions[publications.tiempo] || 0;

    let newPost = document.createElement("div");
    newPost.classList.add("content");
    newPost.innerHTML = `
        <h3>${publications.user}</h3>
        <h4>${publications.comment}</h4>
        <p id="time">${publications.time}</p>
        <img src="${publications.image}" alt="Imagen de publicación">
        <button class="reactionButton">🚀</button>
        <span class="counterReactions">${reaccionCount}</span>
    `;
    postsContainer.appendChild(newPost);
}

// Función para manejar reacciones
function react(event) {
    if (event.target.classList.contains('reactionButton')) {
        let counterSpan = event.target.nextElementSibling;
        let count = parseInt(counterSpan.textContent);
        count += 1;
        counterSpan.textContent = count;

        const publicacionTime = event.target.closest('.content').querySelector('#time').textContent;
        const reactions = JSON.parse(localStorage.getItem('reactions')) || {};
        reactions[publicacionTime] = count;
        localStorage.setItem('reactions', JSON.stringify(reactions));
    }
}

// Mostrar las publicaciones al cargar la página de manera inversa
document.addEventListener('DOMContentLoaded', async () => {
    const publications = await getPosts(URL_POST);
    publications.reverse().forEach(publicacion => {
        showPublication(publicacion);
    });
    postsContainer.addEventListener('click', react);
});

// Función para mostrar el modal al hacer clic en el botón de publicar
post.addEventListener('click', (e) => {
    e.preventDefault();
    if (botonGenerarPost) {
        modal.style.display = "block";
    }
});

// Función para cerrar el modal al hacer clic en la 'x'
span.onclick = function () {
    modal.style.display = "none";
}

// Función para cerrar el modal al hacer clic fuera de él
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Función para subir una publicación al hacer clic en el botón de subir
upload.addEventListener('click', async (e) => {
    e.preventDefault();
    let fileInput = document.querySelector("#foto");
    let file = fileInput.files[0];
    let commentInput = document.querySelector("#comentario");
    let comment = commentInput.value.trim();

    if (comment !== "" && file) {
        const reader = new FileReader();
        reader.onload = async function (event) {
            const user = JSON.parse(localStorage.getItem("user"));
            let newPost = document.createElement("div");
            newPost.classList.add("content");
            newPost.innerHTML = `
                <h3>${user.name}</h3>
                <h4>${comment}</h4>
                <p id="time">${getCurrentTime()}</p>
                <img src="${event.target.result}" alt="Imagen publicación">
                <button class="reactionButton">🚀</button>
                <span class="counterReactions">0</span>
            `;
            postsContainer.insertBefore(newPost, postsContainer.firstChild);
            const newPostData = {
                image: event.target.result, // Aquí guardamos la imagen en base64 como texto plano
                comment: comment,
                time: getCurrentTime(),
                email: user.email,
                user: user.name,
            };

            // Crear la publicación en el servicio JSON
            await createPublication(URL_POST, newPostData);
        };
        reader.readAsDataURL(file);
        // Cerrar el modal después de subir el contenido
        modal.style.display = "none";

        botonGenerarPost = true; // Reactivar el botón
    } else {
        alert("Please complete all fields");
    }
});
