import { Note } from '../js/note.js';

const createNote = document.getElementById('createNote');
const createReject = document.getElementById('create-reject');
const confirmCreateNote = document.getElementById('create-ok');
export const listOfNotes = []; // will be used to load notes from localStorage.


function openCreateNoteWindow() {
	const createNoteWindow = document.querySelector('.create-note-window');
	createNoteWindow.style.display = 'flex';
}
function closeCreateNoteWindow() {
	const createNoteWindow = document.querySelector('.create-note-window');
	createNoteWindow.style.display = 'none';
	document.querySelector('#note-title').value = '';
	document.querySelector('#note-text').value = '';
	document.querySelector('#pick-color').value = '#f6b73c';
}
function createNewNote() {
	const noteToAdd = new Note();
	listOfNotes.push(noteToAdd);
	noteToAdd.putNoteIntoDom();
	closeCreateNoteWindow();
}

createNote.addEventListener('click', openCreateNoteWindow);
createReject.addEventListener('click', closeCreateNoteWindow);
confirmCreateNote.addEventListener('click', createNewNote);
