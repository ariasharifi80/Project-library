const container = document.getElementById("bookContainer");
const bookDialog = document.getElementById("bookDialog");
const bookForm = document.getElementById("bookForm");

class Library { // Class names should be PascalCase
    constructor() {
        this.myLibrary = [];
        this.initForm();
    }

    addBook(title, author, pageNum, year) {
        const newBook = new Book(title, author, pageNum, year); // Fixed Book class call
        this.myLibrary.push(newBook);
        this.bookDisplay();
    }

    openDialog() {
        bookDialog.showModal();
    }

    closeDialog() {
        bookDialog.close();
    }

    initForm() { // Better to separate form initialization
        bookForm.addEventListener("submit", (e) => { // Use arrow function to maintain 'this'
            e.preventDefault();
            
            const title = document.getElementById("bTitle").value;
            const author = document.getElementById("bAuthor").value;
            const pageNumber = parseInt(document.getElementById("pageNum").value);
            const year = parseInt(document.getElementById("bYear").value);
        
            if (!title || !author || isNaN(pageNumber) || isNaN(year)) {
                alert("Please fill out all parts of the form correctly");
                return;
            }
            
            this.addBook(title, author, pageNumber, year); // Use class method
            this.closeDialog();
            bookForm.reset();
        });
    }

    removeBook(bookId) { // Fixed method
        const index = this.myLibrary.findIndex(book => book.id === bookId);
        if (index !== -1) {
            this.myLibrary.splice(index, 1);
            this.bookDisplay();
        } else {
            console.warn("Book not found!");
        }
    }

    bookDisplay() {
        container.innerHTML = "";
        this.myLibrary.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.className = "book-card";
            bookCard.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pageNum}</p>
                <p>Year: ${book.year}</p>
                <button class="delete-btn" data-id="${book.id}">Delete</button>
            `;
            container.appendChild(bookCard);
        });

        // Add event listeners for delete buttons
        container.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.removeBook(e.target.dataset.id);
            });
        });
    }
}

class Book {
    constructor(title, author, pageNum, year) { // Fixed parameters
        if (typeof pageNum !== "number" || typeof year !== "number") {
            throw new Error("Invalid data type. Please enter a number for page number and published year.");
        }
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pageNum = pageNum;
        this.year = year;
    }
}

const libraryApp = new Library(); // Create an instance of Library
