//const API_URL = 

const emptyDivForTableInfoName = document.getElementByID('tableRows')
const idForForm = document.getElementByID()
const buttonToAddBooks = document.getElementByID('submitButton')
function addBooks(event){
    event.preventDefault //stops the form from reloading 
    const publisherForm = document.getElementByID('bookPublisherForm') //these let the form call the different parts of the form
    const bookAuthor = document.getElementByID('bookAuthorForm')
    const bookTitle = document.getElementByID('bookTitleForm')

    //Below is the logic for the if statement; it tells the user that they must fill out the entire form
    if(!bookTitle || !bookAuthor || !publisherForm){
        alert('This form is required');
        return;
    }


//this creates a tr in the html; adds new books for rows
const newBookRow = document.createElement('tr');
newBookRow.innerHTML = ` 
<td class="book-title>${bookTitle}</td> 
<td class="book-author">${bookAuthor}</td>
<td class="book-publisher">${publisherForm}</td>
<td><button class="delete-button">Delete</button></td>

`;
//adding the data from the variable above here using .appendChild -> this means to "add child"
emptyDivForTableInfoName.appendChild('newBookRow');

//everytime the delete button is clicked, it will remove it
newBookRow.querySelector('.delete-button').addEventListener('click', () => {
    //.remove is a built in function for the remove/deletion button
    newBookRow.remove();
});

//Ensure that the information resets after the delete button is pressed
newBookRow.reset();
newBookRow.addEventListener('submit', buttonToAddBooks);
};




