const books = document.querySelector('.books');
const openModal = document.querySelector('.add-book-button');
const modal = document.querySelector('.book-modal');
const addBook = document.querySelector('#add-book');
const cancelBook = document.querySelector('#cancel-book');

const myLibrary = [];

// Book object constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    if (this.read === false) {
      return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    } else {
      return `${this.title} by ${this.author}, ${this.pages} pages, already read`;
    }
  }

  addBookToLibrary(this);
}

// Add a book to the library
function addBookToLibrary(book) {
  myLibrary.push(book)
}

// test books
let hobbit = new Book('The Hobbit', 'J. R. R. Tolkien', 310, false);
let lotr = new Book('The Lord of the Rings', 'J. R. R. Tolkien', 1216, true);
let silmarillion = new Book('The Silmarillion', 'J. R. R. Tolkien', 365, false);
// test books

// Go through each book in the library
for (book of myLibrary) {
  index = myLibrary.indexOf(book);
  title = book.title;
  author = book.author;
  pages = book.pages;
  if (book.read === true) {
    read = 'Already Read'
  } else {
    read = 'Not read yet'
  }

  console.log(index, title, author, pages, read);

  // And add it to the table on the page
  let bookrow = document.createElement('tr');
  bookrow.className = `book-${index}`
  bookrow.innerHTML = `<td>${title}</td>
                       <td>${author}</td>
                       <td>${pages}</td>
                       <td>${read}</td>`
  books.appendChild(bookrow);
}

// Open modal for adding books
openModal.addEventListener('click', () => {
  modal.showModal();
})

// Cancel adding book
cancelBook.addEventListener('click', () => {
  modal.close();
})

// Prevent default click
function noClick(e) {
  e.preventDefault();
}

