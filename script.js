const container = document.getElementById("bookContainer");
const bookDialog = document.getElementById("bookDialog");
const bookForm = document.getElementById("bookForm");

const myLibrary = [];

// Book constructor with a unique id
function Book(title, author, pageNum, year) {
  if (typeof pageNum !== "number" || typeof year !== "number") {
    throw new Error("Invalid data type. Please enter a number for page number and published year.");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.year = year;
}

// Function to add a new book to the library and update the display
function addBook(title, author, pageNum, year) {
  const newBook = new Book(title, author, pageNum, year);
  myLibrary.push(newBook);
  bookDisplay();
}

// Open and close dialog functions
function openDialog(){
  bookDialog.showModal();
}

function closeDialog(){
  bookDialog.close();
}

// Handle form submission to create a new book
bookForm.addEventListener("submit", function(e) {
  e.preventDefault();
  
  const title = document.getElementById("bTitle").value;
  const author = document.getElementById("bAuthor").value;
  const pageNumber = parseInt(document.getElementById("pageNum").value);
  const year = parseInt(document.getElementById("bYear").value);

  if (!title || !author || isNaN(pageNumber) || isNaN(year)){
    alert("Please fill out all parts of the form correctly");
    return;
  }
  
  const addedBook = new Book(title, author, pageNumber, year);
  myLibrary.push(addedBook);
  
  bookDisplay();
  closeDialog();
  bookForm.reset();
});

// Delete a book from the library by its id
function Remove(bookId) {
  const index = myLibrary.findIndex(book => book.id === bookId);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    bookDisplay();
  } else {
    console.warn("Book not found!");
  }
}

// Display the book cards in the container
function bookDisplay() {
  container.innerHTML = "";
  myLibrary.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    bookDiv.innerHTML = `
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Year:</strong> ${book.year}</p>
      <p><strong>Pages:</strong> ${book.pageNum}</p>
      <button onclick="Remove('${book.id}')">Remove From Library</button>
    `;
    container.appendChild(bookDiv);
  });
}

// Add some initial books and display them
addBook("The Hobbit", "J.R.R Tolkien", 310, 1937);
addBook("1984", "George Orwell", 194, 1949);
window.onload = bookDisplay;
