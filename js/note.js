import { listOfNotes } from './script.js';
let zIndex = 0; // used to control z-index of dragged note.
export class Note {
	constructor() {
		this.title = document.querySelector('#note-title').value;
		this.content = document.querySelector('#note-text').value;
		this.color = document.querySelector('#pick-color').value;
		this.x = null;
		this.y = null;
		this.zIndex = ++zIndex;
		this.noteWindow = document.createElement('div');
	}
	putNoteIntoDom() {
		this.noteWindow.className = 'note-window';
		this.noteWindow.setAttribute('draggable', 'true');
		this.noteWindow.style.backgroundColor = this.color;
		this.noteWindow.style.top = `${this.y}px`;
		this.noteWindow.style.left = `${this.x}px`;
		this.noteWindow.style.zIndex = this.zIndex;
		this.noteWindow.innerHTML = `
        <div class="note-header">
                <p id="note-window-title">${this.title}</p>
                <div>
                    <button class="note-window-btn" id="edit-note"><i class="ti ti-pencil"></i></button>
                    <button class="note-window-btn" id="delete-note"><i class="ti ti-trash"></i></button>
                </div>

            </div>
            <div class="note-window-content" id="note-window-content">
                <pre>${this.content}</pre>
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
		//deltaX and deltaY are used to calculate the position of the mouse pointer on the element when dragged. Final coords when moved are used for left top corner of moved element.
		this.deltaX = 0;
		this.deltaY = 0;
		this.noteWindow.addEventListener('dragstart', (e) => {
			e.dataTransfer.setData('text/plain', this);
			this.deltaX = e.pageX - this.noteWindow.offsetLeft;
			this.deltaY = e.pageY - this.noteWindow.offsetTop;
		});
		this.noteWindow.addEventListener('dragend', (e) => {
			this.changeNotePos(e, this.deltaX, this.deltaY);
			this.zIndex = zIndex + 1;
			zIndex > 1000 ? (zIndex = 0) : zIndex++;
			this.noteWindow.style.zIndex = this.zIndex;
		});
	}

	changeNotePos(e, deltaX, deltaY) {
		this.x = e.pageX - deltaX;
		if (this.x < 5) this.x = 5;
		if (this.x > window.innerWidth - this.noteWindow.scrollWidth) {
			this.x = window.innerWidth - this.noteWindow.scrollWidth - 5;
		}
		this.y = e.pageY - deltaY;
		if (this.y < 85) this.y = 85;
		if (this.y > window.innerHeight - this.noteWindow.scrollHeight) {
			this.y = window.innerHeight - this.noteWindow.scrollHeight - 5;
		}
		this.noteWindow.style.top = `${this.y}px`;
		this.noteWindow.style.left = `${this.x}px`;
	}
}
