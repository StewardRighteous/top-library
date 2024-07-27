const myLibrary = [];

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
