
function openTextEditorApp() {
  const win = document.createElement('div');
  win.className = 'window';
  win.style.width = '500px';
  win.style.height = '400px';
  win.innerHTML = `
    <div class="title-bar">
      Bloc de Notas 1.0
      <button onclick="this.parentElement.parentElement.remove()" style="float:right; background:red; color:white; border:none; padding:2px 6px; cursor:pointer;">❌</button>
    </div>
    <div class="content" style="height: 350px; display:flex; flex-direction:column;">
      <div style="flex: 1; display: flex;">
        <div style="width: 150px; border-right: 1px solid #ccc; overflow-y:auto; padding-right: 5px;" id="txtFileList"></div>
        <div style="flex: 1; padding-left: 10px;">
          <input type="text" id="textEditorFileName" placeholder="archivo.txt" style="width:100%; margin-bottom: 5px;">
          <textarea id="textEditorContent" style="width:100%; height:240px;" placeholder="Contenido..."></textarea>
        </div>
      </div>
      <div style="text-align: right; margin-top: 5px;">
        <button class="btn" onclick="saveTxtFile()">💾 Guardar</button>
      </div>
    </div>
  `;
  document.getElementById('desktop').appendChild(win);
  makeDraggable(win);
  listTxtFiles();
}

function listTxtFiles() {
  const folder = "folder_users/" + currentUser + "/";
  const list = document.getElementById('txtFileList');
  const files = JSON.parse(localStorage.getItem(folder) || "{}");
  list.innerHTML = '';

  let found = false;
  for (let filename in files) {
    if (filename.endsWith('.txt')) {
      found = true;
      const el = document.createElement('div');
      el.className = 'file';
      el.style.marginBottom = '5px';
      el.innerHTML = `<button style="width: 100%;" onclick="loadTxtFile('${filename}')">📄 ${filename}</button>`;
      list.appendChild(el);
    }
  }

  if (!found) {
    list.innerHTML = '<span style="color:gray;">(Sin archivos .txt)</span>';
  }
}

function loadTxtFile(filename) {
  const folder = "folder_users/" + currentUser + "/";
  const files = JSON.parse(localStorage.getItem(folder) || "{}");
  document.getElementById('textEditorFileName').value = filename;
  document.getElementById('textEditorContent').value = files[filename] || '';
}

function saveTxtFile() {
  const folder = "folder_users/" + currentUser + "/";
  const name = document.getElementById('textEditorFileName').value.trim();
  const content = document.getElementById('textEditorContent').value;

  if (!name || !name.endsWith(".txt")) {
    alert("El archivo debe tener extensión .txt");
    return;
  }

  const folderData = JSON.parse(localStorage.getItem(folder) || "{}");
  folderData[name] = content;
  localStorage.setItem(folder, JSON.stringify(folderData));
  listTxtFiles();
}
