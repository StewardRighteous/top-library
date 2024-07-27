const myLibrary = [];

const librarySection = document.querySelector(".library");
const newBookButton = document.querySelector(".add-new-book button");
const newBookDialogBox = document.querySelector("dialog");

function Book(name, author, pages, readingStatus){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.readingStatus = readingStatus;
}

Book.prototype.changeReadingStatus= function(){
    if(this.readingStatus == false){
        this.readingStatus = true;
    }else{
        this.readingStatus = false;
    }
}

function addToLibrary(name, author, pages, readingStatus){
    let book = new Book(name, author, pages, readingStatus);
    myLibrary.push(book);
}

function removeFromLibrary(indexValue){
 myLibrary.splice(indexValue); 
}

function showAllBooks(){
    myLibrary.forEach(createCard);
}

function createCard(book){
    const bookTitle = document.createElement("h1");
    const authorName = document.createElement("h2");
    const noOfPages = document.createElement("p");
    const readButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const allButtons = document.createElement("div");
    const bookCard = document.createElement("div");

    readButton.className = "read-status";
    readButton.textContent = "read";
    deleteButton.className = "delete";
    deleteButton.textContent = "delete";

    allButtons.className = "buttons";
    allButtons.append(readButton, deleteButton);

    bookTitle.textContent = book.name;
    authorName.textContent = book.author;
    noOfPages.textContent = book.pages;

    if(book.readingStatus == true){
        readButton.disabled = true;
    }

    bookCard.className = "book"
    bookCard.append(bookTitle, authorName, noOfPages, allButtons)
    librarySection.append(bookCard);
}

newBookButton.addEventListener("click", (e)=>{
    newBookDialogBox.showModal();
});
