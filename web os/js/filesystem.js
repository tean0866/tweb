
function initializeSystemFiles() {
  if (!localStorage.getItem("folder_system/")) {
    localStorage.setItem("folder_system/", JSON.stringify({
      "readme.txt": "Bienvenido al sistema.\nEstos son archivos del sistema."
    }));
  }
}
