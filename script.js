// {
//     "name":"note app",
//     "version":"0.0.1",
//     "manifest_version":2,
//     "browser_action":{
//         "default_popup":"index.html",
//         "default_icon":"./logo.png"
//     },
//     "chrome_url_overrides": {
//     "popup": "popup.html"
// },
//     "icons":{
//     "128":"./logo.png"
//     },
//     "permissions":["storage"]
// }




document.addEventListener('DOMContentLoaded', function () {
    const notesContainer = document.getElementById('notesContainer');
    const noteForm = document.getElementById('noteForm');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');
  
    let notes = [];
    let currentPage = 1;
    const notesPerPage = 6;
  
    noteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const title = document.getElementById('noteTitle').value;
      const tagline = document.getElementById('noteTagline').value;
      const body = document.getElementById('noteBody').value;
      const timestamp = new Date().toLocaleString(); // Capture date and time
  
      const newNote = { id: Date.now(), title, tagline, body, timestamp };
      notes.push(newNote);
  
      displayNotes();
      noteForm.reset();
    });
  
    function displayNotes() {
      notesContainer.innerHTML = '';
  
      const start = (currentPage - 1) * notesPerPage;
      const end = start + notesPerPage;
      const paginatedNotes = notes.slice(start, end);
  
      paginatedNotes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
          <h2>${note.title}</h2>
          <p><strong>Tagline:</strong> ${note.tagline}</p>
          <p>${note.body}</p>
          <p><em>${note.timestamp}</em></p>
          <button onclick="editNote(${note.id})">Edit</button>
          <button onclick="deleteNote(${note.id})">Delete</button>
        `;
        notesContainer.appendChild(noteElement);
      });
  
      updatePaginationInfo();
    }
  
    function updatePaginationInfo() {
      const totalPages = Math.ceil(notes.length / notesPerPage);
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
      prevPageButton.disabled = currentPage === 1;
      nextPageButton.disabled = currentPage === totalPages;
    }
  
    prevPageButton.addEventListener('click', function () {
      if (currentPage > 1) {
        currentPage--;
        displayNotes();
      }
    });
  
    nextPageButton.addEventListener('click', function () {
      const totalPages = Math.ceil(notes.length / notesPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        displayNotes();
      }
    });
  
    window.deleteNote = function (id) {
      notes = notes.filter(note => note.id !== id);
      displayNotes();
    };
  
    window.editNote = function (id) {
      const note = notes.find(note => note.id === id);
      if (note) {
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteTagline').value = note.tagline;
        document.getElementById('noteBody').value = note.body;
  
        notes = notes.filter(note => note.id !== id); // Remove the note being edited
        displayNotes();
      }
    };
  
    displayNotes();
  });
  
  
  
  
  
  
  
  
  
  
  
// document.addEventListener('DOMContentLoaded', function () {
//   const notesContainer = document.getElementById('notesContainer');
//   const noteForm = document.getElementById('noteForm');
//   const prevPageButton = document.getElementById('prevPage');
//   const nextPageButton = document.getElementById('nextPage');
//   const pageInfo = document.getElementById('pageInfo');

//   let notes = [];
//   let currentPage = 1;
//   const notesPerPage = 6;

//   // Load notes from chrome.storage.local when the extension is opened
//   function loadNotes() {
//       chrome.storage.local.get({ notes: [] }, function (data) {
//           notes = data.notes || [];
//           displayNotes();
//       });
//   }

//   noteForm.addEventListener('submit', function (e) {
//       e.preventDefault();
//       const title = document.getElementById('noteTitle').value;
//       const tagline = document.getElementById('noteTagline').value;
//       const body = document.getElementById('noteBody').value;
//       const timestamp = new Date().toLocaleString(); // Capture date and time

//       const newNote = { id: Date.now(), title, tagline, body, timestamp };
//       notes.push(newNote);

//       // Save updated notes to chrome.storage.local
//       chrome.storage.local.set({ notes }, function () {
//           displayNotes();
//       });
//       noteForm.reset();
//   });

//   function displayNotes() {
//       notesContainer.innerHTML = '';

//       const start = (currentPage - 1) * notesPerPage;
//       const end = start + notesPerPage;
//       const paginatedNotes = notes.slice(start, end);

//       paginatedNotes.forEach(note => {
//           const noteElement = document.createElement('div');
//           noteElement.classList.add('note');
//           noteElement.innerHTML = `
//               <h2>${note.title}</h2>
//               <p><strong>Tagline:</strong> ${note.tagline}</p>
//               <p>${note.body}</p>
//               <p><em>${note.timestamp}</em></p>
//               <button onclick="editNote(${note.id})">Edit</button>
//               <button onclick="deleteNote(${note.id})">Delete</button>
//           `;
//           notesContainer.appendChild(noteElement);
//       });

//       updatePaginationInfo();
//   }

//   function updatePaginationInfo() {
//       const totalPages = Math.ceil(notes.length / notesPerPage);
//       pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
//       prevPageButton.disabled = currentPage === 1;
//       nextPageButton.disabled = currentPage === totalPages;
//   }

//   prevPageButton.addEventListener('click', function () {
//       if (currentPage > 1) {
//           currentPage--;
//           displayNotes();
//       }
//   });

//   nextPageButton.addEventListener('click', function () {
//       const totalPages = Math.ceil(notes.length / notesPerPage);
//       if (currentPage < totalPages) {
//           currentPage++;
//           displayNotes();
//       }
//   });

//   window.deleteNote = function (id) {
//       notes = notes.filter(note => note.id !== id);

//       // Save updated notes to chrome.storage.local
//       chrome.storage.local.set({ notes }, function () {
//           displayNotes();
//       });
//   };

//   window.editNote = function (id) {
//       const note = notes.find(note => note.id === id);
//       if (note) {
//           document.getElementById('noteTitle').value = note.title;
//           document.getElementById('noteTagline').value = note.tagline;
//           document.getElementById('noteBody').value = note.body;

//           // Remove the note being edited
//           notes = notes.filter(note => note.id !== id);

//           // Save updated notes to chrome.storage.local
//           chrome.storage.local.set({ notes }, function () {
//               displayNotes();
//           });
//       }
//   };

//   // Load notes on initial page load
//   loadNotes();
// });






// document.addEventListener('DOMContentLoaded', function () {
//   const notesContainer = document.getElementById('notesContainer');
//   const noteForm = document.getElementById('noteForm');
//   const prevPageButton = document.getElementById('prevPage');
//   const nextPageButton = document.getElementById('nextPage');
//   const pageInfo = document.getElementById('pageInfo');

//   let notes = [];
//   let currentPage = 1;
//   const notesPerPage = 6;

//   // Load notes from chrome.storage.local on initial load
//   function loadNotes() {
//     chrome.storage.local.get({ notes: [] }, function (data) {
//       notes = data.notes || [];
//       displayNotes();
//     });
//   }

//   // Save notes to chrome.storage.local
//   function saveNotes() {
//     chrome.storage.local.set({ notes }, function () {
//       console.log('Notes saved to storage.');
//     });
//   }

//   // Add a new note
//   noteForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     const title = document.getElementById('noteTitle').value;
//     const tagline = document.getElementById('noteTagline').value;
//     const body = document.getElementById('noteBody').value;
//     const timestamp = new Date().toLocaleString(); // Capture date and time

//     const newNote = { id: Date.now(), title, tagline, body, timestamp };
//     notes.push(newNote);

//     saveNotes();
//     displayNotes();
//     noteForm.reset();
//   });

//   // Display notes
//   function displayNotes() {
//     notesContainer.innerHTML = '';

//     const start = (currentPage - 1) * notesPerPage;
//     const end = start + notesPerPage;
//     const paginatedNotes = notes.slice(start, end);

//     paginatedNotes.forEach(note => {
//       const noteElement = document.createElement('div');
//       noteElement.classList.add('note');
//       noteElement.innerHTML = `
//         <h2>${note.title}</h2>
//         <p><strong>Tagline:</strong> ${note.tagline}</p>
//         <p>${note.body}</p>
//         <p><em>${note.timestamp}</em></p>
//         <button onclick="editNote(${note.id})">Edit</button>
//         <button onclick="deleteNote(${note.id})">Delete</button>
//       `;
//       notesContainer.appendChild(noteElement);
//     });

//     updatePaginationInfo();
//   }

//   // Update pagination information
//   function updatePaginationInfo() {
//     const totalPages = Math.ceil(notes.length / notesPerPage);
//     pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
//     prevPageButton.disabled = currentPage === 1;
//     nextPageButton.disabled = currentPage === totalPages;
//   }

//   // Pagination buttons
//   prevPageButton.addEventListener('click', function () {
//     if (currentPage > 1) {
//       currentPage--;
//       displayNotes();
//     }
//   });

//   nextPageButton.addEventListener('click', function () {
//     const totalPages = Math.ceil(notes.length / notesPerPage);
//     if (currentPage < totalPages) {
//       currentPage++;
//       displayNotes();
//     }
//   });

//   // Delete a note
//   window.deleteNote = function (id) {
//     notes = notes.filter(note => note.id !== id);
//     saveNotes();
//     displayNotes();
//   };

//   // Edit a note
//   window.editNote = function (id) {
//     const note = notes.find(note => note.id === id);
//     if (note) {
//       document.getElementById('noteTitle').value = note.title;
//       document.getElementById('noteTagline').value = note.tagline;
//       document.getElementById('noteBody').value = note.body;

//       // Remove the note being edited
//       notes = notes.filter(note => note.id !== id);
//       saveNotes();
//       displayNotes();
//     }
//   };

//   // Initial load
//   loadNotes();
// });






// document.addEventListener('DOMContentLoaded', function () {
//   const notesContainer = document.getElementById('notesContainer');
//   const noteForm = document.getElementById('noteForm');
//   const prevPageButton = document.getElementById('prevPage');
//   const nextPageButton = document.getElementById('nextPage');
//   const pageInfo = document.getElementById('pageInfo');

//   let notes = [];
//   let currentPage = 1;
//   const notesPerPage = 6;

//   // Load notes from chrome.storage.local on initial load
//   function loadNotes() {
//     chrome.storage.local.get({ notes: [] }, function (data) {
//       notes = data.notes || [];
//       displayNotes();
//     });
//   }

//   // Save notes to chrome.storage.local
//   function saveNotes() {
//     chrome.storage.local.set({ notes }, function () {
//       console.log('Notes saved.');
//     });
//   }

//   // Add a new note
//   noteForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     const title = document.getElementById('noteTitle').value;
//     const tagline = document.getElementById('noteTagline').value;
//     const body = document.getElementById('noteBody').value;
//     const timestamp = new Date().toLocaleString();

//     const newNote = { id: Date.now(), title, tagline, body, timestamp };
//     notes.push(newNote);

//     saveNotes();
//     displayNotes();
//     noteForm.reset();
//   });

//   // Display notes
//   function displayNotes() {
//     notesContainer.innerHTML = '';

//     const start = (currentPage - 1) * notesPerPage;
//     const end = start + notesPerPage;
//     const paginatedNotes = notes.slice(start, end);

//     paginatedNotes.forEach(note => {
//       const noteElement = document.createElement('div');
//       noteElement.classList.add('note');
//       noteElement.innerHTML = `
//         <h2>${note.title}</h2>
//         <p><strong>Tagline:</strong> ${note.tagline}</p>
//         <p>${note.body}</p>
//         <p><em>${note.timestamp}</em></p>
//         <button class="editButton" data-id="${note.id}">Edit</button>
//         <button class="deleteButton" data-id="${note.id}">Delete</button>
//       `;
//       notesContainer.appendChild(noteElement);
//     });

//     addNoteEventListeners();
//     updatePaginationInfo();
//   }

//   // Add event listeners for edit and delete buttons
//   function addNoteEventListeners() {
//     const editButtons = document.querySelectorAll('.editButton');
//     const deleteButtons = document.querySelectorAll('.deleteButton');

//     editButtons.forEach(button => {
//       button.addEventListener('click', function () {
//         const id = Number(button.getAttribute('data-id'));
//         editNote(id);
//       });
//     });

//     deleteButtons.forEach(button => {
//       button.addEventListener('click', function () {
//         const id = Number(button.getAttribute('data-id'));
//         deleteNote(id);
//       });
//     });
//   }

//   // Update pagination information
//   function updatePaginationInfo() {
//     const totalPages = Math.ceil(notes.length / notesPerPage);
//     pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
//     prevPageButton.disabled = currentPage === 1;
//     nextPageButton.disabled = currentPage === totalPages;
//   }

//   // Pagination buttons
//   prevPageButton.addEventListener('click', function () {
//     if (currentPage > 1) {
//       currentPage--;
//       displayNotes();
//     }
//   });

//   nextPageButton.addEventListener('click', function () {
//     const totalPages = Math.ceil(notes.length / notesPerPage);
//     if (currentPage < totalPages) {
//       currentPage++;
//       displayNotes();
//     }
//   });

//   // Delete a note
//   function deleteNote(id) {
//     notes = notes.filter(note => note.id !== id);
//     saveNotes();
//     displayNotes();
//   }

//   // Edit a note
//   function editNote(id) {
//     const note = notes.find(note => note.id === id);
//     if (note) {
//       document.getElementById('noteTitle').value = note.title;
//       document.getElementById('noteTagline').value = note.tagline;
//       document.getElementById('noteBody').value = note.body;

//       notes = notes.filter(note => note.id !== id);
//       saveNotes();
//       displayNotes();
//     }
//   }

//   // Initial load
//   loadNotes();
// });
