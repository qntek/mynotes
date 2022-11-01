import { Note } from '../js/note.js';

const createNote = document.getElementById('createNote');
const createReject = document.getElementById('create-reject');
const confirmCreateNote = document.getElementById('create-ok');
const editNoteReject = document.getElementById('edit-reject');
export const listOfNotes = []; // an array of all notes.
const listOfLocalNotes = JSON.parse(window.localStorage.getItem('notes'));

function loadLocalStoredNotes() {
	if (listOfLocalNotes) {
		listOfLocalNotes.forEach((note) => {
			const newNoteObj = Object.assign(new Note(), note);
			listOfNotes.push(newNoteObj);
		});
	}
}

function loadNotesFromLocalStorage() {
	if (listOfNotes.length > 0) {
		for (let note of listOfNotes) {
			note.putNoteIntoDom();
			note.positionChange();
		}
	}
}

function openCreateNoteWindow() {
	const createNoteWindow = document.querySelector('.create-note-window');
	const editNoteWindow = document.querySelector('.edit-note-window');
	editNoteWindow.style.display = 'none';
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
	window.localStorage.setItem('notes', JSON.stringify(listOfNotes));
}

// Loading localStorage.
console.log('listOfNotes:', listOfNotes);
loadLocalStoredNotes();
loadNotesFromLocalStorage();

// Listeners
createNote.addEventListener('click', openCreateNoteWindow);
createReject.addEventListener('click', closeCreateNoteWindow);
confirmCreateNote.addEventListener('click', createNewNote);

window.addEventListener('resize', () => {
	listOfNotes.forEach((object) => object.windowResizeHandler());
});

editNoteReject.addEventListener('click', () => {
	const editWindow = document.querySelector('.edit-note-window');
	editWindow.querySelector('button').remove(); // removes button which was added by object.editNoteListener() if user would not confirm edit operation.
	editWindow.style.display = 'none';
});


