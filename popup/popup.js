let currentImage = null;
let currentFile = null;

const noteInput = document.getElementById('note-input');
const saveBtn = document.getElementById('save-btn');
const exportBtn = document.getElementById('export-btn');
const clearBtn = document.getElementById('clear-btn');
const imageInput = document.getElementById('image-input');
const fileInput = document.getElementById('file-input');
const notesList = document.getElementById('notes-list');

async function loadNotes() {
  try {
    const result = await browser.storage.local.get('notes');
    const notes = result.notes || [];
    notesList.innerHTML = '';
    notes.forEach(note => addNoteToDOM(note));
  } catch (error) {
    console.error('Chyba při načítání poznámek:', error);
  }
}

function addNoteToDOM(note) {
  const li = document.createElement('li');
  const date = new Date(note.timestamp);
  const timeStr = date.toLocaleString('cs-CZ');
  
  let html = `<strong>📅 ${timeStr}</strong>`;
  html += `<div class="note-text">${escapeHtml(note.text)}</div>`;
  
  if (note.imageData) {
    html += `<img src="${note.imageData}" alt="Obrázek" data-note-id="${note.id}">`;
  }
  
  if (note.fileName && note.fileData) {
    html += `<button class="download-btn" data-note-id="${note.id}" data-file-name="${note.fileName}">📥 Stáhnout: ${escapeHtml(note.fileName)}</button>`;
  }
  
  html += `<div class="note-controls"><button class="delete-btn" data-note-id="${note.id}">❌ Smazat</button></div>`;
  
  li.innerHTML = html;
  
  const deleteBtn = li.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => deleteNote(note.id));
  
  const downloadBtn = li.querySelector('.download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => downloadFile(note.id));
  }
  
  const img = li.querySelector('img');
  if (img) {
    img.addEventListener('click', () => openImage(note.imageData));
  }
  
  notesList.appendChild(li);
}

async function saveNote() {
  const text = noteInput.value.trim();
  
  if (!text && !currentImage && !currentFile) {
    alert('Prosím zadejte text nebo vyberte obrázek/soubor');
    return;
  }

  try {
    const result = await browser.storage.local.get('notes');
    const notes = result.notes || [];
    
    const newNote = {
      id: Date.now(),
      text: text,
      imageData: currentImage,
      fileName: currentFile?.name || null,
      fileData: currentFile?.data || null,
      timestamp: new Date().toISOString()
    };
    
    notes.push(newNote);
    await browser.storage.local.set({ notes });
    
    noteInput.value = '';
    currentImage = null;
    currentFile = null;
    imageInput.value = '';
    fileInput.value = '';
    
    await loadNotes();
  } catch (error) {
    console.error('Chyba při ukládání poznámky:', error);
    alert('Chyba při ukládání poznámky!');
  }
}

async function deleteNote(id) {
  if (!confirm('Opravdu chcete smazat tuto poznámku?')) return;

  try {
    const result = await browser.storage.local.get('notes');
    const notes = result.notes || [];
    const filtered = notes.filter(note => note.id !== id);
    await browser.storage.local.set({ notes: filtered });
    await loadNotes();
  } catch (error) {
    console.error('Chyba při mazání poznámky:', error);
  }
}

async function exportToJSON() {
  try {
    const result = await browser.storage.local.get('notes');
    const notes = result.notes || [];
    
    const exportData = notes.map(note => ({
      id: note.id,
      text: note.text,
      fileName: note.fileName,
      hasImage: !!note.imageData,
      hasFile: !!note.fileData,
      timestamp: note.timestamp
    }));
    
    const jsonString = JSON.stringify({ notes: exportData }, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    a.download = `poznamky_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    alert('Poznámky byly exportovány!');
  } catch (error) {
    console.error('Chyba při exportu:', error);
    alert('Chyba při exportu!');
  }
}

async function clearAllNotes() {
  if (!confirm('Opravdu chcete vymazat VŠECHNY poznámky? Tuto akci nelze vrátit!')) return;

  try {
    await browser.storage.local.set({ notes: [] });
    await loadNotes();
    alert('Všechny poznámky byly vymazány');
  } catch (error) {
    console.error('Chyba při mazání všech poznámek:', error);
  }
}

imageInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    if (!file.type.startsWith('image/')) {
      alert('Prosím vyberte obrázek!');
      imageInput.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
      currentImage = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

fileInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      currentFile = { name: file.name, data: event.target.result };
    };
    reader.readAsArrayBuffer(file);
  }
});

function downloadFile(noteId) {
  try {
    browser.storage.local.get('notes').then(result => {
      const notes = result.notes || [];
      const note = notes.find(n => n.id === noteId);
      
      if (note && note.fileData && note.fileName) {
        const byteArray = new Uint8Array(note.fileData);
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = note.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
      }
    });
  } catch (error) {
    console.error('Chyba při stahování souboru:', error);
    alert('Chyba při stahování souboru!');
  }
}

function openImage(imageData) {
  const img = window.open();
  img.document.write(`<img src="${imageData}" style="max-width: 100%;">`);
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

saveBtn.addEventListener('click', saveNote);
exportBtn.addEventListener('click', exportToJSON);
clearBtn.addEventListener('click', clearAllNotes);

noteInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && e.ctrlKey) saveNote();
});

document.addEventListener('DOMContentLoaded', loadNotes);