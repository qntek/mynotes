import { listOfNotes } from './script.js';
let zIndex = 0; // used to control z-index of dragged note.
export class Note {
	constructor() {
		this.title = document.querySelector('#note-title').value;
		this.content = document.querySelector('#note-text').value;
		this.color = document.querySelector('#pick-color').value;
		this.x = null; // position on screen after drag drop.
		this.y = null;
		this.xProp = null; // will be used to keep position on thee screen when window will resize.
		this.yProp = null;
		this.zIndex = ++zIndex;
		this.noteWindow = '';
	}
	putNoteIntoDom() {
		this.noteWindow = document.createElement('div')
		this.noteWindow.className = 'note-window';
		this.noteWindow.setAttribute('draggable', 'true');
		this.noteWindow.style.backgroundColor = this.color;
		this.noteWindow.style.top = `${this.y}px`;
		this.noteWindow.style.left = `${this.x}px`;
		this.noteWindow.style.zIndex = this.zIndex;
		this.noteInnerHTML();
		// document.body.appendChild(this.noteWindow);
		document.getElementById('drop').appendChild(this.noteWindow);
		this.deleteNoteListener();
		this.dragDropListener();
		this.editNoteListener();
	}
	noteInnerHTML() {
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
	}
	deleteNoteListener() {
		const deleteBtn = this.noteWindow.querySelector('#delete-note');
		deleteBtn.addEventListener('click', (e) => {
			e.target.closest('.note-window').remove();
			const inxof = listOfNotes.indexOf(this);
			listOfNotes.splice(inxof, 1);
			if (listOfNotes.length === 0) zIndex = 5;
			window.localStorage.setItem('notes', JSON.stringify(listOfNotes));
		});
	}

	dragDropListener() {
		//deltaX and deltaY are used to calculate the position of the mouse pointer on the element when dragged. Final coords when moved are used for left top corner of moved element.
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
			window.localStorage.setItem('notes', JSON.stringify(listOfNotes));
		});
		this.noteWindow.addEventListener('touchstart', (e) => {
			this.deltaX = e.changedTouches[0].clientX - this.noteWindow.offsetLeft;
			this.deltaY = e.changedTouches[0].clientY - this.noteWindow.offsetTop;
		});
		this.noteWindow.addEventListener('touchend', (e) => {
			this.changeNotePosMobiles(e, this.deltaX, this.deltaY);
			this.zIndex = zIndex + 1;
			zIndex > 1000 ? (zIndex = 0) : zIndex++;
			this.noteWindow.style.zIndex = this.zIndex;
			window.localStorage.setItem('notes', JSON.stringify(listOfNotes));
		});
	}

	changeNotePos(e, deltaX, deltaY) {
		this.x = e.pageX - deltaX;
		this.y = e.pageY - deltaY;
		this.positionChange();

		this.xProp = this.x / window.innerWidth;
		this.yProp = this.y / window.innerHeight;
	}
	changeNotePosMobiles(e, deltaX, deltaY) {
		this.x = e.changedTouches[0].clientX - deltaX;
		this.y = e.changedTouches[0].clientY - deltaY;
		this.positionChange();

		this.xProp = this.x / window.innerWidth;
		this.yProp = this.y / window.innerHeight;
	}
	windowResizeHandler() {
		// keeps note on proportional position during resizing
		this.x = window.innerWidth * this.xProp;
		this.y = window.innerHeight * this.yProp;
		this.positionChange();
	}
	positionChange() {
		// keeps note inside viewport
		if (this.x < 5) this.x = 5;
		if (this.x > window.innerWidth - this.noteWindow.scrollWidth) {
			this.x = window.innerWidth - this.noteWindow.scrollWidth - 5;
		}
		if (this.y < 85) this.y = 85;
		if (this.y > window.innerHeight - this.noteWindow.scrollHeight) {
			this.y = window.innerHeight - this.noteWindow.scrollHeight - 5;
		}
		this.noteWindow.style.top = `${this.y}px`;
		this.noteWindow.style.left = `${this.x}px`;
		window.localStorage.setItem('notes', JSON.stringify(listOfNotes));
	}
	editNoteListener() {
		const editNoteWindow = document.querySelector('.edit-note-window');
		const editNoteBtns = editNoteWindow.querySelector('.edit-note-btns');
		this.editBtn = this.noteWindow.querySelector('#edit-note');
		this.editBtn.addEventListener('click', () => {
			//to avoid editing all notes, confirmation button is being created by object that is being edited in current moment. When confirmed, button is removed from DOM.
			this.editConfirmBtn = document.createElement('button');
			this.editConfirmBtn.setAttribute('class', 'btn btn-ok');
			this.editConfirmBtn.setAttribute('id', 'edit-ok');
			this.editConfirmBtn.innerHTML = '<i class="ti ti-circle-check"></i>';
			editNoteBtns.prepend(this.editConfirmBtn);
			editNoteWindow.style.display = 'flex';
			editNoteWindow.querySelector('#edit-note-title').value = this.title;
			editNoteWindow.querySelector('#edit-note-text').value = this.content;
			editNoteWindow.querySelector('#edit-pick-color').value = this.color;
			const editConfirmBtn = editNoteWindow.querySelector('#edit-ok');
			editConfirmBtn.addEventListener('click', () => {
				this.title = editNoteWindow.querySelector('#edit-note-title').value;
				this.content = editNoteWindow.querySelector('#edit-note-text').value;
				this.color = editNoteWindow.querySelector('#edit-pick-color').value;
				this.noteWindow.querySelector('#note-window-title').textContent =
					this.title;
				this.noteWindow.querySelector('#note-window-content').textContent =
					this.content;
				this.noteWindow.style.backgroundColor = this.color;
				editNoteWindow.style.display = 'none';
				this.editConfirmBtn.remove(); // remove created confirm button witch his listener.
				window.localStorage.setItem('notes', JSON.stringify(listOfNotes));
			});
		});
	}
}
