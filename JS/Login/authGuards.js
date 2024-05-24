(() => {
  const user = localStorage.getItem("user");

  if (!user) {
    window.location.href = "login.html";
    alert('Inicia sesión')
  }
})();
