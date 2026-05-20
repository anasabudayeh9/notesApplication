const form = document.querySelector('.newNote__form');
const Inputtitle = document.querySelector('.newNote__form__input');
const textfield = document.querySelector('.newNote__form__textfield');
const cardContainer = document.querySelector('.cardContainer');
const searchInput = document.querySelector('input[placeholder="Search"]');
let editIndex = null;
const modal = document.getElementById('editModal');
const main = document.querySelector('main');

renderNotes();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(Inputtitle.value);
        console.log(textfield.value);

     const note = {
        title: Inputtitle.value,
        text: textfield.value,
    }

    

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    console.log(notes);
    if(editIndex === null){
        notes.push(note);
    }else{
        notes[editIndex] = note;
        editIndex = null;
    }
    

    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));

    renderNotes();
    

    Inputtitle.value = '';
    textfield.value = '';
});


function renderNotes(search = '') {
    cardContainer.innerHTML = ''; 
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    console.log(notes);

    const filteredNotes = notes.filter((note) => {
    return (
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.text.toLowerCase().includes(search.toLowerCase())
        );    });
        filteredNotes.forEach((note) => {

        const realIndex = notes.indexOf(note);

        const noteElement = document.createElement('div');

        noteElement.className =
        ' bg-white/60 shadow-lg rounded-xl flex flex-col justify-center items-start gap-3 p-5 ml-1 mr-1 w-full max-w-70';

        noteElement.innerHTML = `
            <label class="font-serif">Title:</label>
            <input 
            class="editTitle pl-2 border p-2 rounded w-full"
            placeholder="No Text Found" readonly value="${note.title}">

            <label class="font-serif">Note:</label>
            <textarea 
            class="editText border p-2 rounded w-full"
            placeholder="No Text Found" readonly>${note.text}</textarea>

 
            <div class="flex gap-7 min-w-full justify-evenly items-center">

                <button 
                    onclick="editNote(${realIndex})"
                    class=" bg-black/80 text-white text-sm rounded-md p-0.5 w-2/6">
                    Edit
                </button>

                <button 
                    onclick="deleteNote(${realIndex})"
                    class=" bg-black text-white text-sm rounded-md p-0.5 w-2/6">
                    Delete
                </button>

            </div>
        `;
        cardContainer.appendChild(noteElement);

    });
}

function deleteNote(index) {
    const deleteElemnt = document.createElement('div');
    deleteElemnt.className =
    'fixed inset-0 bg-black/50 flex justify-center items-center';

    deleteElemnt.innerHTML = `
        <div class="bg-white text-red-500 p-5 rounded-xl text-start w-80 flex flex-col gap-3 ml-3 mr-3">
        <h2 class="text-lg font-semibold">Are you sure you want to delete this note?</h2>
        <div class="flex justify-end gap-2">

            <button class="dontDeleteBtn px-3 py-1 border rounded">
                Cancel
            </button>

            <button class="deleteBtn px-3 py-1 bg-red-500  text-white rounded">
                Delete
            </button>

        </div>

    </div>
    `;

    main.appendChild(deleteElemnt);
    const dontDeleteBtn = deleteElemnt.querySelector('.dontDeleteBtn');
    const deleteBtn = deleteElemnt.querySelector('.deleteBtn');

    dontDeleteBtn.addEventListener('click', () => {
        deleteElemnt.remove();
    });

    const toDelete = deleteBtn.addEventListener('click', () => {

        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes(searchInput.value);
        deleteElemnt.remove();

    });

}


    
    


function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    const note = notes[index];


   const editElemnt = document.createElement('div');

    editElemnt.className =
    'fixed inset-0 bg-black/50 flex justify-center items-center';

    editElemnt.innerHTML = `
        <div class="bg-white p-5 rounded-xl w-80 flex flex-col gap-3 ml-3 mr-3">

        <h2 class="text-lg font-semibold">Edit Note</h2>

        <input 
            class="editTitle pl-2 border p-2 rounded"
            placeholder="Title">

        <textarea 
            class="editText border p-2 rounded"
            placeholder="Text"></textarea>

        <div class="flex justify-end gap-2">

            <button class="cancelBtn px-3 py-1 border rounded">
                Cancel
            </button>

            <button class="saveBtn px-3 py-1 bg-black text-white rounded">
                Save
            </button>

        </div>

    </div>
    `;
    main.appendChild(editElemnt);

   
    
    const editTitle = editElemnt.querySelector('.editTitle');
    const editText = editElemnt.querySelector('.editText');
    const saveBtn = editElemnt.querySelector('.saveBtn');
    const cancelBtn = editElemnt.querySelector('.cancelBtn');

    editTitle.value = note.title;
    editText.value = note.text;

    saveBtn.addEventListener('click', () => {

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes[index] = {
        title: editTitle.value,
        text: editText.value
    };

    localStorage.setItem('notes', JSON.stringify(notes));

    renderNotes(searchInput.value);

    editElemnt.remove();
});

cancelBtn.addEventListener('click', () => {
    editElemnt.remove();
});

}


searchInput.addEventListener('input', () => {
    renderNotes(searchInput.value);
});

