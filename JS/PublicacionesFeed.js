const fa_plus = document.querySelector(".fa-plus");
const publicacionesContainer = document.querySelector("#publicaciones-container");
let botonGenerarPost = true;

// Función para obtener el tiempo actual en un formato legible
function obtenerTiempoActual() {
    const ahora = new Date();
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return ahora.toLocaleDateString('es-ES', opciones);
}

fa_plus.addEventListener('click', (e) => { 
    e.preventDefault();
    if (botonGenerarPost) {
        agregarpublicacion();
        botonGenerarPost = false; // Desactivar el botón después de hacer clic
    }
});

function agregarpublicacion() {
    // Crear un contenedor para el formulario de publicación
    let formContainer = document.createElement("div");
    formContainer.classList.add("card");

    formContainer.innerHTML = `
        <input type="file" id="foto" accept="image/*">
        <label for="comentario">Comentario:</label>
        <textarea id="comentario"></textarea>
        <button id="subir">Subir contenido</button>
        <a href="#" id="cancelar">X</a>
    `;

    // Manejar la carga de la imagen y el comentario
    let subir = formContainer.querySelector("#subir");
    subir.addEventListener('click', (e) => {
        e.preventDefault();
        let fileInput = formContainer.querySelector("#foto");
        let file = fileInput.files[0];
        let commentInput = formContainer.querySelector("#comentario");
        let comment =  commentInput.value.trim();
        
        if (comment !== "" && file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                let newPost = document.createElement("div");
                newPost.classList.add("contenido");
                newPost.innerHTML = `
                    <img src="${event.target.result}" alt="Imagen del estudiante">
                    <h4>${comment}</h4>
                    <p id="time">${obtenerTiempoActual()}</p>`; // Agregar el tiempo de publicación
                // Insertar la nueva publicación antes de la primera publicación existente
                publicacionesContainer.insertBefore(newPost, publicacionesContainer.firstChild);
                // Eliminar el formulario de publicación después de publicar
                formContainer.remove();
                // Reactivar el botón para permitir agregar otra publicación
                botonGenerarPost = true;
            };
            reader.readAsDataURL(file);
        } else {
            alert("Por favor, completa todos los campos");
        }
        let timep = formContainer.querySelector("#time");
        let time = timep.value.trim();
        const post = {
            imgen: file,
            comit: comment,
            time: time,
            life: 0,
        }
    });

    // Eliminar el formulario de publicación
    let cancelar = formContainer.querySelector("#cancelar");
    cancelar.addEventListener('click', (e) => {
        e.preventDefault();  
        formContainer.remove();
        // Reactivar el botón para permitir agregar otra publicación
        botonGenerarPost = true;
    });

    // Agregar el formulario de publicación al contenedor principal
    publicacionesContainer.insertBefore(formContainer, publicacionesContainer.firstChild);
    
}
