function darkMode() {
    let element = document.body;
    element.classList.toggle("darkMode");

    let modeToggle = document.querySelector("#changeMode");
    if (element.classList.contains("darkMode")) {
        modeToggle.innerHTML = `<i class="fa-solid fa-circle"></i> Light mode`;
        localStorage.setItem('darkMode', 'enabled');
    } else {
        modeToggle.innerHTML = `<i class="fa-solid fa-circle"></i> Dark mode`;
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Check the user's preference on page load
window.onload = function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('darkMode');
        document.querySelector("#changeMode").innerHTML = `<i class="fa-solid fa-circle"></i> Light mode`;
    } else {
        document.body.classList.remove('darkMode');
        document.querySelector("#changeMode").innerHTML = `<i class="fa-solid fa-circle"></i> Dark mode`;
    }
}