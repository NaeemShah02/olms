document.addEventListener("DOMContentLoaded", function () {
    const bookList = document.getElementById("book-list");
    const addBookForm = document.getElementById("add-book-form");
    const searchForm = document.getElementById("search-books");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    const books = [
        { title: "Hacking : The Art of Exploitation", author: "Jon Erickson", isbn: "978-1593271442" },
        { title: "Introduction to the Theory of Computation", author: "Michael Sipser", isbn: "978-1133187790" },
        { title: "Eloquent JavaScript : A Modern Introduction to Programming", author: "Marijn Haverbeke", isbn: "978-1593279509" }
    ];

    addBookForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const isbn = document.getElementById("isbn").value;

        if (!title || !author || !isbn) {
            alert("Please fill out all fields to add a new book.");
            return;
        }

        if (books.some(book => book.isbn === isbn)) {
            alert("Book with this ISBN already exists.");
            return;
        }

        const newBook = { title, author, isbn };
        books.push(newBook);
        displayBooks();
        addBookForm.reset();
    });

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        searchBooks();
    });

    function displayBooks() {
        bookList.innerHTML = "";
        if (books.length === 0) {
            bookList.textContent = "No books available.";
            return;
        }
        books.forEach((book, index) => {
            const bookItem = document.createElement("div");
            bookItem.className = "book-item";
            bookItem.textContent = `${book.title} by ${book.author} ISBN: ${book.isbn}`;
            bookList.appendChild(bookItem);
        });
    }

    function searchBooks() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().split(' ').some(word => word === searchTerm) ||
            book.author.toLowerCase().split(' ').some(word => word === searchTerm) ||
            book.isbn.includes(searchTerm)
        );
        displaySearchResults(filteredBooks);
    }

    function displaySearchResults(results) {
        searchResults.innerHTML = "";
        if (results.length === 0) {
            searchResults.textContent = "No matching books found.";
            return;
        }
        results.forEach(book => {
            const listItem = document.createElement("li");
            listItem.textContent = `${book.title} by ${book.author} ISBN: ${book.isbn}`;
            searchResults.appendChild(listItem);
        });
    }

    // Initial display of books
    displayBooks();
});
