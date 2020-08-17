const form = document.querySelector(".book-form");
const table = document.querySelector("tbody");

//FORM VALUES
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPage = document.querySelector("#pages");
const bookRead = document.querySelector("#read-input");

let myLibrary = [];

function Book(bookName, author, pages, isRead) {
  this.bookName = bookName;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// submitBtn.addEventListener("click", addBook);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPage.value,
    bookRead.checked
  );
  myLibrary.push(newBook);
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPage.value = "";
  bookRead.checked = "";
  render();
});

function render() {
  table.innerHTML = "";
  myLibrary.forEach((value, index) => {
    let read = value.isRead ? "Yes" : "No";
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${value.bookName}</td>
    <td>${value.author}</td>
    <td>${value.pages}</td>
    <td><span class="change-read">${read}<span></td>
    <td><button class="deleteBtn" data-index=${index}>X</button></td>`;
    table.appendChild(tr);
  });
  addListener();
}

function deleteRow(e) {
  // const parent = e.target.parentElement.parentElement;
  // parent.remove();
  let bookindex = e.target.attributes["data-index"].value;
  myLibrary.splice(bookindex, 1);
  render();
}

function toggleRead(e) {
  if (e.target.innerText === "Yes") e.target.innerText = "No";
  else e.target.innerText = "Yes";
}

function addListener() {
  //Delete Button
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((btn) => btn.addEventListener("click", deleteRow));
  const readSelect = document.querySelectorAll(".change-read");
  readSelect.forEach((btn) => btn.addEventListener("click", toggleRead));
}
