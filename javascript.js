const myLibrary = [];

function Book(id, author, title, pageNum, isRead, synopsis) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead;
    this.synopsis = synopsis;
}

function addBookToLibrary (author, title, pageNum, isRead, synopsis) {
    let generatedID = crypto.randomUUID();
    let newBook = new Book(generatedID, author, title, pageNum, isRead, synopsis);
    myLibrary.push(newBook);
}

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
}

addBookToLibrary("Aivan", "Hello World!", 143, true, "I'm book 1!");
addBookToLibrary("Pau", "Goodbye Universe", 724, false, "I'm book 2~");


for (let book of myLibrary) {
    console.log(book);
}
