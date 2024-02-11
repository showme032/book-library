const books = document.querySelector(".books");
const openModal = document.querySelector(".add-book-button");
const modal = document.querySelector(".book-modal");
const form = document.querySelector(".add-book-form");
const addBook = document.querySelector("#add-book");
const cancelBook = document.querySelector("#cancel-book");

const myLibrary = [];

// Book class declaration
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  // Setters
  set title(title) {
    this._title = title;
  }
  set author(author) {
    this._author = author;
  }
  set pages(pages) {
    this._pages = pages;
  }
  set read(read) {
    this._read = read;
  }

  // Getters
  get title() {
    return this._title;
  }
  get author() {
    return this._author;
  }
  get pages() {
    return this._pages;
  }
  get read() {
    return this._read;
  }

  info = function () {
    if (this.read === false) {
      return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    } else {
      return `${this.title} by ${this.author}, ${this.pages} pages, already read`;
    }
  };
}

// example books
let hobbit = new Book("The Hobbit", "J. R. R. Tolkien", 310, false);
let lotr = new Book("The Lord of the Rings", "J. R. R. Tolkien", 1216, false);
let silmarillion = new Book("The Silmarillion", "J. R. R. Tolkien", 365, true);
let crinBlanc = new Book("Crin-Blanc", "René Guillot", 158, true);
myLibrary.push(hobbit, lotr, silmarillion, crinBlanc);
// example books

// Display library on page load
displayBooks();

// Open modal for adding books
openModal.addEventListener("click", () => {
  modal.showModal();
  form.reset();

  // Create object of input book in library
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let newTitle = document.getElementById("title").value;
    let newAuthor = document.getElementById("author").value;
    let newPages = document.getElementById("pages").value;
    let newRead;
    if (document.querySelector('input[name="read"]:checked').value === "true") {
      newRead = true;
    } else {
      newRead = false;
    }

    newBook = new Book(newTitle, newAuthor, newPages, newRead);
    myLibrary.push(newBook);
    displayBooks();
    modal.close();
  });

  // Cancel adding book
  cancelBook.addEventListener("click", () => {
    modal.close();
  });
});

// Delete book or change read status, per request
document.addEventListener("click", (e) => {
  if (e.target.matches(".del-btn")) {
    removeIndex = e.target.name;
    myLibrary.splice(removeIndex, 1);
    displayBooks();
  } else if (e.target.matches(".rd-btn")) {
    updateBook = myLibrary[e.target.name];
    if (updateBook.read === true) {
      updateBook.read = false;
      e.target.innerText = "Not read";
    } else {
      updateBook.read = true;
      e.target.innerText = "Read";
    }
    displayBooks();
  }
});

// Display all the books from the library
function displayBooks() {
  // Clear previous display
  books.innerHTML = "";

  // Loop through library, adding books to the page
  for (let index = 0; index < myLibrary.length; index++) {
    let book = myLibrary[index];
    let title = book.title;
    let author = book.author;
    let pages = book.pages;
    let read;
    if (book.read === true) {
      read = "Read";
    } else {
      read = "Not read";
    }

    // Create page element
    let bookrow = document.createElement("tr");
    let readClass = "";
    if (read === "Read") {
      readClass = "read";
    } else {
      readClass = "not-read";
    }

    // Set it's values
    bookrow.innerHTML = `<td>${title}</td>
                         <td>${author}</td>
                         <td>${pages}</td>
                         <td><button name=${index} class="rd-btn ${readClass}">${read}</button></td>
                         <td><button name=${index} class="del-btn">Delete</button></td>`;

    books.appendChild(bookrow);
  }
}
