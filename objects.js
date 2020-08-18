const form = document.querySelector(".book-form");
const table = document.querySelector("tbody");

//FORM SELECTOR
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPage = document.querySelector("#pages");
const bookRead = document.querySelector("#read-input");

let myLibrary = [
  {
    bookName: "Sherlock",
    author: "Arthur Conan Doyle",
    pages: 220,
    isRead: false,
  },
  {
    bookName: "The Wind Rises",
    author: "Ghibli",
    pages: 160,
    isRead: true,
  },
];

//Constructor Function
function Book(bookName, author, pages, isRead) {
  this.bookName = bookName;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

//Add data in the array and call the display book function.
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
  addBookToTable(newBook, myLibrary.length - 1);
});

//Display data present in array.
function render() {
  myLibrary.forEach((value, index) => {
    addBookToTable(value, index);
  });
}

//Delete and toggle read functionality
function changeProperties(e) {
  if (e.target.classList.contains("deleteBtn")) {
    let bookindex = e.target.attributes["data-index"].value;
    myLibrary.splice(bookindex, 1);
    const parent = e.target.parentElement.parentElement;
    parent.remove();
  } else if (e.target.classList.contains("change-read")) {
    if (e.target.innerText === "Yes") e.target.innerText = "No";
    else e.target.innerText = "Yes";
  }
}

//Display data after submitting.
function addBookToTable(book, index) {
  let read = book.isRead ? "Yes" : "No";
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${book.bookName}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td><span class="change-read">${read}<span></td>
    <td><button class="deleteBtn" data-index=${index}>X</button></td>`;
  table.appendChild(tr);
}

table.addEventListener("click", changeProperties);

render();
