const myLibrary = [];
const main = document.querySelector("main");
function Book(id, title, author, pageNum, synopsis, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.synopsis = synopsis;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, pageNum, synopsis, isRead) {
    const generatedID = crypto.randomUUID();
    let book = new Book(generatedID, title, author, pageNum, synopsis, isRead);
    myLibrary.push(book);
    displayLibrary();
}

const modal = document.querySelector("dialog");
const addBookBtn = document.querySelector("button.add-book");
const cancelBtn = document.querySelector("#cancel");
const addBtn = document.querySelector("#submit");
const form = document.querySelector("form");
addBookBtn.addEventListener("click", () => modal.showModal());
cancelBtn.addEventListener("click", () => modal.close());
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //Get form data
    const formData = new FormData(form);
    const bookInfoArr = Array.from(formData.values());
    bookInfoArr[bookInfoArr.length - 1] = (bookInfoArr[bookInfoArr.length - 1] === "true");
    console.log(bookInfoArr);
    
    //Add book to library
    addBookToLibrary(...bookInfoArr);
    modal.close();
    form.reset();
});


//Function to create book card in dom
function createCard (book) {
    //Create base card
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = book.id;

    let readText = (book.isRead)? "---Status: Read---":"---Status: Not yet Read---";

    const cardDivClasses = ["read-text", "title", "author", "pages", "synopsis"];
    const cardDivValues = [readText, book.title, book.author, book.pageNum, book.synopsis];
    const cardDivs = [];

    const metaInfo = document.createElement("div");
    metaInfo.classList.add("book-meta-info");

    for (let i = 0; i < cardDivClasses.length; i++) {
        let div = document.createElement("div");
        div.classList.add(cardDivClasses[i]);
        div.textContent = cardDivValues[i];

        //Add header-text class to title. Append author and pages to metainfo
        if (div.classList.contains("title")) div.classList.add("header-text");
        if (div.classList.contains("author") || div.classList.contains("pages")) {
            if (div.classList.contains("author")) div.textContent = "Author: " + div.textContent;
            if (div.classList.contains("pages")) div.textContent = div.textContent + " pages";
            metaInfo.appendChild(div);
            continue;
        }
        cardDivs.push(div);
    }

    //Format meta info and push to card divs
    const sep = document.createElement("span")
    sep.textContent = "|";
    metaInfo.insertBefore(sep, metaInfo.lastChild);
    cardDivs.splice(cardDivs.length - 1, 0, metaInfo);
    
    //Add divs to card
    for (let i = 0; i < cardDivs.length; i++) {
        card.appendChild(cardDivs[i]);
    }

    //ADD BUTTONS TO CARD//
    const cardBtns = document.createElement("div");
    cardBtns.classList.add("card-buttons");

    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.classList.add("toggle-read");
    toggleReadBtn.textContent = "Toggle Read";
    toggleReadBtn.addEventListener("click", () => {
        for (let i = 0; i < myLibrary.length; i++) {
            if (card.id == myLibrary[i].id) {
                myLibrary[i].isRead = !myLibrary[i].isRead;
                card.firstChild.textContent = (myLibrary[i].isRead)? "---Status: Read---":"---Status: Not yet Read---";
                break;
            }
        }

    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        //Remove from library
        for (let i = 0; i < myLibrary.length; i++) {
            if (card.id == myLibrary[i].id) {
                myLibrary.splice(i, 1);
                break;
            }
        }
        //Showcase library
        displayLibrary();
    });

    cardBtns.appendChild(toggleReadBtn);
    cardBtns.appendChild(deleteBtn);
    card.appendChild(cardBtns);
    return card;
}
//Function to loop through library and display books
function displayLibrary () {
    while (main.firstChild)
        main.firstChild.remove();
    for (let book of myLibrary) {
        let bookCard = createCard(book);
        main.appendChild(bookCard);
    }
}