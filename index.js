// defining the api endpoint
const API_URL = "https://bookstore-api-six.vercel.app/api/books";

// Run when the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    fetchBooks(); // Fetching and displaying books on page load

    // Handling form submission when user adds a book
    document.getElementById("book-form").addEventListener("submit", async (e) => {
        e.preventDefault(); // Preventing default form behavior

        // Getting input values
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const publisher = document.getElementById("publisher").value;

        // Checking if all fields are filled
        if (title && author && publisher) {
            await addBook({ title, author, publisher }); // Calling function to add book
            fetchBooks(); // Refreshing book list
            document.getElementById("book-form").reset(); // Clearing form inputs
        }
    });
});

// Function to fetch books from the API
async function fetchBooks() {
    const booksContainer = document.getElementById("books-container");
    booksContainer.innerHTML = "<tr><td colspan='4' class='text-center'>Loading...</td></tr>";

    try {
        const response = await fetch(API_URL); // Fetch data from API
        const books = await response.json(); // Convert response to JSON

        booksContainer.innerHTML = ""; // Clearing previous book list

        // Looping through each book and creating a table row
        books.forEach((book) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
                <td>
                    <button class="btn delete-btn" onclick="deleteBook('${book.id}')">
                        Delete
                    </button>
                </td>
            `;
            booksContainer.appendChild(row); // Appending row to table
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        booksContainer.innerHTML = "<tr><td colspan='4' class='text-center'>Error loading books</td></tr>";
    }
}

// Function to add a book via API
async function addBook(book) {
    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });
    } catch (error) {
        console.error("Error adding book:", error);
    }
}

// Function to delete a book via API
async function deleteBook(bookId) {
    try {
        await fetch(`${API_URL}/${bookId}`, { method: "DELETE" }); // Send DELETE request
        fetchBooks(); // Refreshing book list
    } catch (error) {
        console.error("Error deleting book:", error);
    }
}