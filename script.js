const myLibrary = [];

const librarySection = document.querySelector(".library");

const newBookForm = document.querySelector("form");
const newBookButton = document.querySelector(".add-new-book button");
const newBookDialogBox = document.querySelector("dialog");
const cancelNewBookButton = document.querySelector("form .cancel");
const addNewBookButton = document.querySelector("form .add-book");
const newBookTitle = document.querySelector("#title");
const newBookAuthor = document.querySelector("#author")
const newBookPages = document.querySelector("#pages");
const newBookReadingStatus = document.querySelector("#read");

class Book {
    constructor(name, author, pages, readingStatus, indexValue) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.readingStatus = readingStatus;
        this.indexValue = indexValue;
    }
    changeReadingStatus() {
        if (this.readingStatus == false) {
            this.readingStatus = true;
        } else {
            this.readingStatus = false;
        }
    }
}


function addToLibrary(name, author, pages, readingStatus, indexValue) {
    let book = new Book(name, author, pages, readingStatus, indexValue);
    myLibrary.push(book);
    createCard(book);
}

function removeFromLibrary(indexValue) {
    myLibrary.splice(indexValue);
}


function createCard(book) {
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

    if (book.readingStatus == true) {
        readButton.disabled = true;
    }

    bookCard.className = "book"
    bookCard.append(bookTitle, authorName, noOfPages, allButtons);
    bookCard.setAttribute("data-index", book.indexValue);


    bookCard.addEventListener("click", (e) => {
        let indexValue = bookCard.getAttribute("data-index");
        // Delete book 
        if (e.target.matches("button.delete")) {
            removeFromLibrary(indexValue);
            librarySection.removeChild(bookCard);
        }
        // change reading status
        if (e.target.matches("button.read-status")) {
            myLibrary.at(indexValue).changeReadingStatus();
            console.log(myLibrary);
            if (myLibrary.at(indexValue).readingStatus == true) {
                e.target.style.backgroundColor = "gray";
                e.target.textContent = "Done"
            } else {
                e.target.style.backgroundColor = "rgb(80, 180, 152)";
                e.target.textContent = "Read"
            }
        }
    });

    librarySection.append(bookCard);
}


newBookButton.addEventListener("click", () => {
    newBookDialogBox.showModal();
});

cancelNewBookButton.addEventListener("click", () => {
    newBookDialogBox.close();
});

addNewBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    let allElementsFilled = true;
    for (const element of newBookForm) {
        if (!element.reportValidity()) {
            allElementsFilled = false;
        }
    }
    if (allElementsFilled) {
        let readingStatus;
        readingStatus = (newBookReadingStatus.checked) ? true : false;
        addToLibrary(newBookTitle.value, newBookAuthor.value, newBookPages.value, readingStatus, myLibrary.length);
        newBookDialogBox.close();
        newBookTitle.value = newBookAuthor.value = newBookPages.value = readingStatus = "";
    } else {
        alert("Please Fill all the Fields");
    }
});

