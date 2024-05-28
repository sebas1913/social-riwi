const nameContainer = document.querySelector(".name");
const user = JSON.parse(localStorage.getItem("user"));
const emailContainer = document.querySelector(".email");
const email = JSON.parse(localStorage.getItem("user"));
const skillsContainer = document.querySelector(".skills");
const skills = JSON.parse(localStorage.getItem("user"));
nameContainer.textContent = user.name;
emailContainer.textContent = user.email;
skillsContainer.textContent = user.skills;

// DOM variables
const publicationsContainer = document.querySelector("#publicaciones-container");

// JSON service URL for posts
const URL_POST = "http://localhost:3000/post";

// JSON service URL for users
const URL_USERS = "http://localhost:3000/users";

// Function to fetch posts from JSON service
async function fetchPosts(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

// Function to fetch users from JSON service
async function fetchUsers(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

// Function to display a post in the DOM
function displayPost(post) {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    
    // Check if the email of the post matches the email of the current user
    if (post.email === currentUser.email) {
        let newPost = document.createElement("div");
        newPost.classList.add("contenido");
        newPost.dataset.id = publicacion.id; 
        newPost.innerHTML = `
            <button class="delete">❌</button>
            <h3>${publicacion.user}</h3>
            <h4>${publicacion.comentario}</h4>
            <p>${publicacion.tiempo}</p>
            <img src="${publicacion.imagen}" alt="Imagen del estudiante">

        `;
        publicationsContainer.appendChild(newPost);
    }
}

// Display posts when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const [posts, users] = await Promise.all([fetchPosts(URL_POST), fetchUsers(URL_USERS)]);
    
    // Filter posts by the email of the current user
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const userPosts = posts.filter(post => post.email === currentUser.email);

    // Reverse the order of posts
    userPosts.reverse();

    // Mostrar las publicaciones filtradas
    userPosts.forEach(publication => {
        mostrarPublicacion(publication);
    });

    publicacionesContainer.addEventListener('click', async (e) => {
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
