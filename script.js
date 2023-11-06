document.addEventListener("DOMContentLoaded", function () {
    const bookList = document.getElementById("book-list");
    const addBookForm = document.getElementById("add-book-form");
    const searchForm = document.getElementById("search-books");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    const errorMessage = document.getElementById("error-message");

    const books = [
        { title: "Hacking: The Art of Exploitation", author: "Jon Erickson", isbn: "978-1593271442" },
        { title: "Introduction to the Theory of Computation", author: "Michael Sipser", isbn: "978-1133187790" },
        { title: "Eloquent JavaScript: A Modern Introduction to Programming", author: "Marijn Haverbeke", isbn: "978-1593279509" }
    ];

    displayBooks();

    addBookForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const isbn = document.getElementById("isbn").value;

        // Prevent duplicate entries
        if (books.some(book => book.isbn === isbn)) {
            errorMessage.classList.remove("hidden");
            return;
        }

        const newBook = { title, author, isbn };
        books.push(newBook);
        errorMessage.classList.add("hidden");
        displayBooks();
        addBookForm.reset();
    });

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        searchBooks();
    });

    function displayBooks() {
        bookList.innerHTML = "";
        books.forEach((book, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${book.title} by ${book.author} ISBN: ${book.isbn}`;
            bookList.appendChild(listItem);
        });
    }

    function searchBooks() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
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
        results.forEach((book, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${book.title} by ${book.author} ISBN: ${book.isbn}`;
            searchResults.appendChild(listItem);
        });
    }
});

