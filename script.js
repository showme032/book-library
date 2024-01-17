const bookshelf = document.querySelector('.bookshelf')

const myLibrary = [];

// Book object constructor
function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;

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
let hobbit = new Book('The Hobbit', 'J. R. R. Tolkien', 310);
let lotr = new Book('The Lord of the Rings', 'J. R. R. Tolkien', 1216);
let silmarillion = new Book('The Silmarillion', 'J. R. R. Tolkien', 365);
// test books

// Go through each book in the library
for (book of myLibrary) {
  index = myLibrary.indexOf(book);
  title = book.title;
  author = book.author;
  pages = book.pages;
  read = book.read;

  console.log(index, title, author, pages, read);

  // And add it to the table on the page
  let bookrow = document.createElement('tr');
  bookrow.className = `book-${index}`
  bookrow.innerHTML = `<td>${title}</td>
                       <td>${author}</td>
                       <td>${pages}</td>
                       <td>${read}</td>`
  bookshelf.appendChild(bookrow);

}