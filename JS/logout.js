const logout = () => {
    localStorage.removeItem('user'); //Deletes user information from local storage
    sessionStorage.removeItem('token'); // Delete the session token if it exists
    window.location.href = '/HTML/login.html'; // Redirect the user to the login page 
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
