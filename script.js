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

// Display library on page load
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
    form.reset();
    modal.close();
  })

  // Cancel adding book
  cancelBook.addEventListener('click', () => {
    modal.close();
  })
})

// Delete book when requested
document.addEventListener('click', (e) => {
  if (e.target.matches('.del-btn')) {
    // console.log(e);
    removeIndex = e.target.name;
    myLibrary.splice(removeIndex, 1);
    displayBooks()
  } else if (e.target.matches('.rd-btn')) {
    updateBook = myLibrary[e.target.name];
    console.log(e);
    // mby fix this up
    if (updateBook.read === true) {
      updateBook.read = false;
      e.target.innerText = 'Not read'
    } else {
      updateBook.read = true;
      e.target.innerText = 'Read'
    }
  }
})

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

  myLibrary.push(this)
}

// Display all the books from the library
function displayBooks() {
  // Clear books element
  books.innerHTML = "";

  // on the page
  for (let index = 0; index < myLibrary.length; index++) {
    book = myLibrary[index];
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
    // bookrow.setAttribute('id', index);
    // bookrow.className = `book-${index}`
    bookrow.innerHTML = `<td>${title}</td>
                         <td>${author}</td>
                         <td>${pages}</td>
                         <td><button name=${index} class="rd-btn">${read}</button></td>
                         <td><button name=${index} class="del-btn">Delete</button></td>`
                         
    books.appendChild(bookrow);

    // Delete book when requested
    // let e = document.getElementById(index)
    // e.addEventListener('click', () => {
    //   myLibrary.splice(e.id, 1);
    //   displayBooks();
    // })
  }
}