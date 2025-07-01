function createAppWindow(title, contentHTML, width = 400, height = 300) {
  const win = document.createElement('div');
  win.className = 'window';
  win.style.width = width + 'px';
  win.style.height = height + 'px';

  win.innerHTML = `
    <div class="title-bar">
      creador de app
      <button onclick="this.parentElement.parentElement.remove()" style="float:right; background:red; color:white; border:none; padding:2px 6px; cursor:pointer;">❌</button>
    </div>
    <div class="content"></div>
  `;

  document.getElementById('desktop').appendChild(win);
  makeDraggable(win);
}
