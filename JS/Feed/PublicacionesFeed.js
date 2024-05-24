// Variables del DOM
const post = document.querySelector("#post");
const publicacionesContainer = document.querySelector("#publicaciones-container");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const subir = document.getElementById("subir");
let botonGenerarPost = true;

// URL del servicio JSON
const URL_POST = "http://localhost:3000/post";

// Función para obtener el tiempo actual en un formato legible
function obtenerTiempoActual() {
    const ahora = new Date();
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return ahora.toLocaleDateString('es-ES', opciones);
}

// Función para hacer una solicitud POST al servicio JSON
async function postt(URL, contentData) {
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contentData),
    });
    return response;
}

// Función para obtener publicaciones del servicio JSON
async function obtenerPublicaciones(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

// Función para crear una nueva publicación en el servicio JSON y en el DOM
async function crearPublicacion(URL, nuevaPublicacion) {
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
function mostrarPublicacion(publicacion) {
    const user = JSON.parse(localStorage.getItem("user"));
    let newPost = document.createElement("div");
    newPost.classList.add("contenido");
    newPost.innerHTML = `
        <h3>${user.name}</h3>
        <h4>${publicacion.comentario}</h4>
        <p id="time">${publicacion.tiempo}</p>
        <img src="${publicacion.imagen}" alt="Imagen del estudiante">
    `;
    publicacionesContainer.appendChild(newPost);
}

// Mostrar las publicaciones al cargar la página de manera inversa
document.addEventListener('DOMContentLoaded', async () => {
    const publicaciones = await obtenerPublicaciones(URL_POST);
    publicaciones.reverse().forEach(publicacion => {
        mostrarPublicacion(publicacion);
    });
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
subir.addEventListener('click', async (e) => {
    e.preventDefault();
    let fileInput = document.querySelector("#foto");
    let file = fileInput.files[0];
    let commentInput = document.querySelector("#comentario");
    let comment = commentInput.value.trim();

    if (comment !== "" && file) {
        const reader = new FileReader();
        reader.onload = async function (event) {
            let newPost = document.createElement("div");
            newPost.classList.add("contenido");
            newPost.innerHTML = `
                <h4>${comment}</h4>
                <p id="time">${obtenerTiempoActual()}</p>
                <img src="${event.target.result}" alt="Imagen del estudiante">
            `;
            publicacionesContainer.insertBefore(newPost, publicacionesContainer.firstChild);

            const newPostData = {
                imagen: event.target.result, // Aquí guardamos la imagen en base64 como texto plano
                comentario: comment,
                tiempo: obtenerTiempoActual(),
                vida: 0,
            };
            // Crear la publicación en el servicio JSON
            await crearPublicacion(URL_POST, newPostData);
        };
        reader.readAsDataURL(file);
        // Cerrar el modal después de subir el contenido
        modal.style.display = "none";
        botonGenerarPost = true; // Reactivar el botón
    } else {
        alert("Por favor, completa todos los campos");
    }
});
