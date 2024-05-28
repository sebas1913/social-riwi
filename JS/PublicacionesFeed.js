const post = document.querySelector("#post");
        const publicacionesContainer = document.querySelector("#publicaciones-container");
        const modal = document.getElementById("myModal");
        const span = document.getElementsByClassName("close")[0];
        const subir = document.getElementById("subir");
        let botonGenerarPost = true;

// Function to get the current time in a readable format
        function obtenerTiempoActual() {
            const ahora = new Date();
            const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            return ahora.toLocaleDateString('es-ES', opciones);
        }

        post.addEventListener('click', (e) => { 
            e.preventDefault();
            if (botonGenerarPost) {
                modal.style.display = "block";
            }
        });

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        subir.addEventListener('click', (e) => {
            e.preventDefault();
            let fileInput = document.querySelector("#foto");
            let file = fileInput.files[0];
            let commentInput = document.querySelector("#comentario");
            let comment = commentInput.value.trim();
            
            if (comment !== "" && file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    let newPost = document.createElement("div");
                    newPost.classList.add("contenido");
                    newPost.innerHTML = `
                        <h4>${comment}</h4>
                        <p id="time">${obtenerTiempoActual()}</p>
                        <img src="${event.target.result}" alt="Imagen del estudiante">
                    `;
                    publicacionesContainer.insertBefore(newPost, publicacionesContainer.firstChild);
                };
                reader.readAsDataURL(file);

// Close the modal after uploading the content
                modal.style.display = "none";
                botonGenerarPost = true; // Reactivate the button
            } else {
                alert("Please complete all fields");
            }
});