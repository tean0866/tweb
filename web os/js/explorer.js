function openFileExplorer() {
  const win = document.createElement('div');
  win.className = 'window';
  win.style.width = '600px';
  win.style.height = '420px';
  win.innerHTML = `
    <div class="title-bar">
      Explorador de Archivos
      <button onclick="this.parentElement.parentElement.remove()" style="float:right; background:red; color:white; border:none; padding:2px 6px; cursor:pointer;">❌</button>
    </div>
    <div class="content" style="display: flex; height: 370px; padding: 0;">
      <div style="width: 160px; background: #ecf0f1; border-right: 1px solid #ccc; padding: 10px;">
        <div class="btn" style="width:100%;" onclick="selectFolder('folder_system/')">📁 Sistema</div>
        <div class="btn" style="width:100%;" onclick="selectFolder('folder_users/${currentUser}/')">👤 Mis Archivos</div>
      </div>
      <div style="flex: 1; display: flex; flex-direction: column;">
        <div style="background: #ddd; padding: 6px; font-size: 14px;">
          Ruta: <span id="currentPath">Ninguna</span>
        </div>
        <div style="flex:1; overflow-y:auto; padding: 10px;" id="fileList"></div>
        <div style="padding: 10px; background: #f5f5f5; border-top: 1px solid #ccc;">
          <input type="text" id="itemName" placeholder="Nombre (archivo o carpeta)">
          <select id="itemType">
            <option value="file">Archivo</option>
            <option value="folder">Carpeta</option>
          </select>
          <textarea id="itemContent" rows="2" style="width:100%; margin-top:5px;" placeholder="Contenido del archivo (opcional)"></textarea>
          <div style="margin-top:5px;">
            <button class="btn" onclick="createItem()">➕ Crear</button>
            <button class="btn" onclick="saveFile()">💾 Guardar</button>
            <button class="btn" onclick="deleteFile()">🗑️ Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById('desktop').appendChild(win);
  makeDraggable(win);
  selectFolder("folder_users/" + currentUser + "/");
}

let currentFolder = "";

function selectFolder(folder) {
  currentFolder = folder;
  document.getElementById("currentPath").innerText = folder;
  listFiles();
}

function getSelectedFolder() {
  return currentFolder;
}

function createItem() {
  const name = document.getElementById("itemName").value.trim();
  const type = document.getElementById("itemType").value;
  const content = document.getElementById("itemContent").value;
  if (!name) return alert("Nombre requerido.");

  if (type === "folder") {
    const newPath = currentFolder + name + "/";
    if (localStorage.getItem(newPath)) return alert("La carpeta ya existe.");
    localStorage.setItem(newPath, "{}");
  } else {
    const folderData = JSON.parse(localStorage.getItem(currentFolder) || "{}");
    folderData[name] = content;
    localStorage.setItem(currentFolder, JSON.stringify(folderData));
  }

  listFiles();
  document.getElementById("itemName").value = "";
  document.getElementById("itemContent").value = "";
}

function saveFile() {
  const name = document.getElementById("itemName").value.trim();
  const content = document.getElementById("itemContent").value;
  if (!name) return alert("Nombre requerido.");
  const folderData = JSON.parse(localStorage.getItem(currentFolder) || "{}");
  folderData[name] = content;
  localStorage.setItem(currentFolder, JSON.stringify(folderData));
  listFiles();
}

function deleteFile() {
  const name = document.getElementById("itemName").value.trim();
  if (!name) return alert("Nombre requerido.");
  const folderData = JSON.parse(localStorage.getItem(currentFolder) || "{}");
  delete folderData[name];
  localStorage.setItem(currentFolder, JSON.stringify(folderData));
  listFiles();
}

function listFiles() {
  const folder = currentFolder;
  const list = document.getElementById('fileList');
  list.innerHTML = '';

  // Subcarpetas
  const subfolders = new Set();
  for (let key in localStorage) {
    if (key.startsWith(folder) && key !== folder && key.endsWith("/")) {
      const sub = key.substring(folder.length).split("/")[0];
      if (sub && !subfolders.has(sub)) {
        subfolders.add(sub);
        const el = document.createElement('div');
        el.className = 'file';
        el.style.color = 'blue';
        el.innerHTML = `<strong>📁 ${sub}</strong> <button onclick="selectFolder('${folder + sub}/')">Abrir</button>`;
        list.appendChild(el);
      }
    }
  }

  // Archivos
  const files = JSON.parse(localStorage.getItem(folder) || "{}");
  for (let filename in files) {
    const el = document.createElement('div');
    el.className = 'file';
    el.style.display = 'flex';
    el.style.justifyContent = 'space-between';
    el.innerHTML = `
      <span>📄 ${filename}</span>
      <button onclick="loadFile('${filename}')">Abrir</button>
    `;
    list.appendChild(el);
  }

  if (!list.innerHTML) {
    list.innerHTML = "<span style='color:gray;'>(Vacío)</span>";
  }
}

function loadFile(filename) {
  const files = JSON.parse(localStorage.getItem(currentFolder) || "{}");
  document.getElementById('itemName').value = filename;
  document.getElementById('itemType').value = "file";
  document.getElementById('itemContent').value = files[filename] || '';
}
