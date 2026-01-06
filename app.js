
showNotes();



// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  let cdate = new Date();
  let currentDate = cdate.toLocaleString();
  let setDate = document.getElementById("date");
  setDate.value = currentDate;
  let addTxt = document.getElementById("addTxt");
  let title = document.getElementById("title");
  let date = document.getElementById("date");
  let notes = localStorage.getItem("notes");
  let head = localStorage.getItem("title");
  let storeDate = localStorage.getItem("date");

  if (notes == null) {
    titleObj = [];
    notesObj = [];
    dateObj = [];
  } else {
    titleObj = JSON.parse(head);
    notesObj = JSON.parse(notes);
    dateObj = JSON.parse(storeDate);
  }
  titleObj.push(title.value);
  notesObj.push(addTxt.value);
  dateObj.push(date.value);
  localStorage.setItem("title", JSON.stringify(titleObj));
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("date", JSON.stringify(dateObj));
  addTxt.value = "";
  title.value = "";
  date.value = "";
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  let head = localStorage.getItem("title");
  let date = localStorage.getItem("date");
  if (notes == null) {
    notesObj = [];
    titleObj = [];
    dateObj = [];
  } else {
    notesObj = JSON.parse(notes);
    titleObj = JSON.parse(head);
    dateObj = JSON.parse(date);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h4 id="title" class="card-title"> ${titleObj[index]}</h4>
                        <p class="card-text"> ${element}</p>
                        <p style="font-size:12px" class="card-text"><b>Created: </b>${dateObj[index]}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  let title = localStorage.getItem("title");
  let date = localStorage.getItem("date");
  if (notes == null) {
    notesObj = [];
    titleObj = [];
  } else {
    notesObj = JSON.parse(notes);
    titleObj = JSON.parse(title);
    dateObj = JSON.parse(date);
  }

  notesObj.splice(index, 1);
  titleObj.splice(index, 1);
  dateObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("title", JSON.stringify(titleObj));
  localStorage.setItem("date", JSON.stringify(dateObj));
  showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("h4")[0].innerText;
    let cardtxt = cardTxt.toLocaleLowerCase();
    if (cardtxt.includes(inputVal)) {
      element.style.display = "block";

    }
    else {
      element.style.display = "none";
    }
  })
})

