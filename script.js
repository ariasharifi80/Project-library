const container = document.getElementById("bookContainer");
const myLibrary = [];

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

function addBook(title, author, pageNum, year) {
    const newBook = new Book(title, author, pageNum, year);
    myLibrary.push(newBook);
    bookDisplay();
}

addBook("Hobbit", "J.R.R Tolkien", 310, 1937);
addBook("1984", "George Orwell", 194, 1949);

function bookDisplay() {
    container.innerHTML = ""; // Clears the container before adding books

    myLibrary.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book-card");

        bookDiv.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Number of Pages:</strong> ${book.pageNum}</p>
        `;

        container.appendChild(bookDiv); // Append each book div to the container
    });
}

// Call the display function to show books on page load
window.onload = bookDisplay;

