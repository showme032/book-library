const books = document.querySelector('.books');
const openModal = document.querySelector('.add-book-button');
const modal = document.querySelector('.book-modal');
const form = document.querySelector('.add-book-form')
const addBook = document.querySelector('#add-book');
const cancelBook = document.querySelector('#cancel-book');

const myLibrary = [];

// example books
let hobbit = new Book('The Hobbit', 'J. R. R. Tolkien', 310, false);
let lotr = new Book('The Lord of the Rings', 'J. R. R. Tolkien', 1216, false);
let silmarillion = new Book('The Silmarillion', 'J. R. R. Tolkien', 365, true);
let crinBlanc = new Book('Crin-Blanc', 'René Guillot', 158, true);
// example books

// Display library on load
displayBooks();

// Open modal for adding books
openModal.addEventListener('click', () => {
  modal.showModal();

  // Create object of input book in library
  form.addEventListener('submit', (e) => {
    // Prevent default click action
    e.preventDefault()

    let newTitle = document.getElementById('title').value;
    let newAuthor = document.getElementById('author').value;
    let newPages = document.getElementById('pages').value;
    if (document.querySelector('input[name="read"]:checked').value === "true") {
      newRead = true;
    } else {
      newRead = false;
    }

    newBook = new Book(newTitle, newAuthor, newPages, newRead);
    displayBooks();
    modal.close();
  })

  // Cancel adding book
  cancelBook.addEventListener('click', () => {
    modal.close();
  })
})

// Book object constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = myLibrary.length;

  this.info = function() {
    if (this.read === false) {
      return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    } else {
      return `${this.title} by ${this.author}, ${this.pages} pages, already read`;
    }
  }

  myLibrary.push(this)
}

// Display books from the library on the page
function displayBooks() {
  // Clear console, books element
  console.clear();
  books.innerHTML = "";

  // on the page
  for (book of myLibrary) {
    console.log(book);
    let index = book.index;
    let title = book.title;
    let author = book.author;
    let pages = book.pages;
    if (book.read === true) {
      read = 'Read'
    } else {
      read = 'Not read'
    }
  
  
    // And add it to the table on the page
    let bookrow = document.createElement('tr');
    bookrow.className = `book-${index}`
    bookrow.innerHTML = `<td>${title}</td>
                         <td>${author}</td>
                         <td>${pages}</td>
                         <td>${read}</td>
                         <td><button id=${index} class="del-btn">Delete</button></td>`
                         
    books.appendChild(bookrow);

    // Delete book when delete clicked
    document.getElementById(index).addEventListener('click', (e) => {
      let delId = e.currentTarget.getAttribute("id");
      myLibrary.splice(delId, delId+1);
      displayBooks();
    })
  }
}