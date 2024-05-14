document.addEventListener('DOMContentLoaded', () => {
    console.log('El DOM ha sido completamente cargado.');

    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        const usernameValue = document.querySelector('#username').value.trim();
        const passwordValue = document.querySelector('#password').value.trim();

        if (usernameValue === '' || passwordValue === '') {
            event.preventDefault();
            alert('Completa todos los campos :)');
        }
    });
});
