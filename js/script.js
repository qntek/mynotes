const createNote = document.getElementById('createNote');
const createReject =  document.getElementById('create-reject');

function openCreateNoteWindow() {
    const createNoteWindow = document.querySelector('.create-note-window');
    createNoteWindow.style.display = 'flex';
}
function closeCreateNoteWindow() {
    const createNoteWindow = document.querySelector('.create-note-window');
    createNoteWindow.style.display = 'none';
}

createNote.addEventListener('click', openCreateNoteWindow);
createReject.addEventListener('click', closeCreateNoteWindow);