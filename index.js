

// Get elements by their ID
const emptyDivForTableInfoName = document.getElementById('tableRows');
const idForForm = document.getElementById('formId');  
const buttonToAddBooks = document.getElementById('submitButton');

// Event listener for the submit button
buttonToAddBooks.addEventListener('click', addBooks);

// Add books function
function addBooks(event){
    event.preventDefault();  // .preventDefault prevents the form from reloading 

    // Get the form values
    const publisherForm = document.getElementById('bookPublisherForm');
    const bookAuthor = document.getElementById('bookAuthorForm');
    const bookTitle = document.getElementById('bookTitleForm');

    // Check if any of the form fields are empty
    if (!bookTitle.value || !bookAuthor.value || !publisherForm.value) {
        alert('All fields are required!');
        return;
    }

    // Create a new table row with the book details that will be entered. I utilized template literals here. 
    const newBookRow = document.createElement('tr');
    newBookRow.innerHTML = `
        <td class="book-title">${bookTitle.value}</td>
        <td class="book-author">${bookAuthor.value}</td>
        <td class="book-publisher">${publisherForm.value}</td>
        <td><button class="delete-button">Delete</button></td>
    `;

    // Append the new row to the table
    emptyDivForTableInfoName.appendChild(newBookRow);

    // This block is for the delete button. 
    newBookRow.querySelector('.delete-button').addEventListener('click', () => {
        newBookRow.remove();  // Remove the row when delete is clicked
    });

    // This helps reset the form after submitting. It is better than using a .reset on the table rows
    
    bookTitle.value = '';
    bookAuthor.value = '';
    publisherForm.value = '';
}

function getBooks() {
    fetch('https://bookstore-api-six.vercel.app/api/books')
.then(response => response.json())
.then(json => console.log(json))
}

