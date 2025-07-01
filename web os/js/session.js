
let currentUser = null;

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const userKey = "user_" + username;

  if (!username) {
    document.getElementById("loginMessage").innerText = "Debes ingresar un nombre de usuario.";
    return;
  }

  const saved = JSON.parse(localStorage.getItem(userKey));

  if (saved) {
    if (saved.password && saved.password !== password) {
      document.getElementById("loginMessage").innerText = "Contraseña incorrecta.";
      return;
    }
  } else {
    localStorage.setItem(userKey, JSON.stringify({ password }));
    localStorage.setItem("folder_users/" + username + "/", "{}");
  }

  currentUser = username;
  initializeSystemFiles();
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("desktop").style.display = "block";
}
