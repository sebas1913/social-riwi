(() => {
  const user = localStorage.getItem("user");

  if (!user) {
    window.location.href = "login.html";
    alert('You must log in :(')
  }
})();

