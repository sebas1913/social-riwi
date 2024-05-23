const logout = () => {
    localStorage.removeItem('user'); // Elimina la información del usuario del almacenamiento local
    sessionStorage.removeItem('token'); // Elimina el token de sesión si existe
    window.location.href = '/HTML/login.html'; // Redirige al usuario a la página de inicio de sesión
};

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            logout();
        });
    }
});
