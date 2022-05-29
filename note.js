// GLOBAL QUERY SELECTOR

const noteContainer = document.querySelector(".note-container");
const modalContainer = document.querySelector(".modal-container");
const tittleInput = document.querySelector("#tittle");
const form = document.querySelector("form");

// CREATING NEW NOTE UI

function addNoteToList(note) {
const newUInote = document.createElement("div");
newUInote.classList.add("note");
newUInote.innerHTML = ` 
     <span hidden>${note.id}</span>
     <h2 class="note-tittle">${note.tittle}</h2>
    <p class="note-body">${note.body}</p>
    <div class="note-btns">
     <button class="note-btn note-view">View details</button>
     <button class="note-btn note-delete">Delete details</button>
    </div> `;
   noteContainer.appendChild(newUInote);


}
// VIEW NOTE IN MODAL
function activateNoteModal(tittle, body) {
  const modalTittle = document.querySelector(".modal-tittle");
  const modalBody = document.querySelector(".modal-body");
  modalTittle.textContent = tittle;
  modalBody.textContent = body;
  modalContainer.classList.add("active");

}

// ALERT MESSAGE
function showAlertMessage(message, alertClass) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `message ${alertClass}`;
  alertDiv.appendChild(document.createTextNode(message))
  form.insertAdjacentElement("beforebegin", alertDiv);
  tittleInput.focus();
  setTimeout(() => alertDiv.remove(), 2000)

}
//   EVENT NOTE BUTTONS
noteContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("note-view")) {
      const currentNote = e.target.closest(".note");
      const currentTittle = currentNote.querySelector(".note-tittle").textContent;
      const currentBody =  currentNote.querySelector(".note-body").textContent;
      activateNoteModal(currentTittle, currentBody)
  }
  if (e.target.classList.contains("note-delete")) {
    const currentNote = e.target.closest(".note");
    showAlertMessage("Your note was permanently deleted", "remove-message");
    currentNote.remove();
    const id = currentNote.querySelector("span").textContent;
    removeNote(Number(id))
  }
})

// EVENT FOR CLOSING MODAL BUTTON 
const modalButton = document.querySelector(".modal-btn");
modalButton.addEventListener("click", () => {
    modalContainer.classList.remove("active");
})
// CLASS FOR CREATING NOTE

class Note {
    constructor(tittle, body) {
        this.tittle = tittle;
        this.body = body;
        this.id = Math.random();
    }
}
function displayNotes() {
   const notes = getNotes();
  notes.forEach(note => {
    addNoteToList(note)
  });
}

// FUNCTION RETRIEV NOTE FROM LOCAL STORAGE
function getNotes() {
  let notes;
  if (localStorage.getItem("noteApp.notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("noteApp.notes"));
  }
  return notes;
}
document.addEventListener("DOMContentLoaded", displayNotes)

function addNoteToLocalStorage(note) {
  const notes = getNotes();
  notes.push(note);
  localStorage.setItem("noteApp.notes", JSON.stringify(notes))

}
// remove note from local storage
function removeNote(id) {
   const notes = getNotes();
   notes.forEach((note, index) => {
     if (note.id === id) {
       notes.splice(index, 1)
     }
     localStorage.setItem("noteApp.notes", JSON.stringify(notes))
   })
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const noteInput = document.querySelector("#note");
    // validate inputs

    if (tittleInput.value.length > 0 && noteInput.value.length > 0) {
        const newNote = new Note(tittleInput.value, noteInput.value);

        addNoteToList(newNote)
        addNoteToLocalStorage(newNote)
    
    tittleInput.value = "";
    noteInput.value = "";
    showAlertMessage("Note successfully added", "sucess-message");
    tittleInput.focus();
    } else {
      showAlertMessage("Please add both the note and tittle", "alert-message");
    }
})