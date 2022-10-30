import { listOfNotes } from './script.js';

export class Note {
	constructor() {
		this.title = document.querySelector('#note-title').value;
		this.content = document.querySelector('#note-text').value;
		this.color = document.querySelector('#pick-color').value;
		this.x = null;
		this.y = null;
		this.id = Math.random();
		this.noteWindow = document.createElement('div');
	}
	putNoteIntoDom() {
		this.noteWindow.className = 'note-window';
		this.noteWindow.setAttribute('draggable', 'true');
		this.noteWindow.style.backgroundColor = this.color;
		this.noteWindow.style.top = `${this.y}px`;
		this.noteWindow.style.left = `${this.x}px`;
		this.noteWindow.innerHTML = `
        <div class="note-header">
                <p id="note-window-title">${this.title}</p>
                <div>
                    <button class="note-window-btn" id="edit-note"><i class="ti ti-pencil"></i></button>
                    <button class="note-window-btn" id="delete-note"><i class="ti ti-trash"></i></button>
                </div>

            </div>
            <div class="note-window-content" id="note-window-content">
                ${this.content}
            </div>
        `;
		document.body.appendChild(this.noteWindow);

		this.deleteNoteListener();
		this.dragDropListener();
	}

	deleteNoteListener() {
		const deleteBtn = this.noteWindow.querySelector('#delete-note');
		deleteBtn.addEventListener('click', (e) => {
			e.target.closest('.note-window').remove();
			const inxof = listOfNotes.indexOf(this);
			listOfNotes.splice(inxof, 1);
		});
	}

	dragDropListener() {
		this.noteWindow.addEventListener('dragstart', (e) => {
			e.dataTransfer.setData('text/plain', this);
		});
		this.noteWindow.addEventListener('dragend', (e) => {
			this.changeNotePos(e);
		});
	}

	changeNotePos(e) {
		this.x = e.pageX;
		this.y = e.pageY;
		this.noteWindow.style.top = `${this.y}px`;
		this.noteWindow.style.left = `${this.x}px`;
	}
}
