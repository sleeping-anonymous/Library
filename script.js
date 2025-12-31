const myLibrary = [];

// constructor
function Books(title, author, pages, read) {
    this.id = crypto.randomUUID();  //he randomUUID() method of the Crypto interface is used to generate a v4 UUID using a cryptographically secure random number generator
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// add book to lib
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Books(title, author, pages, read));
}

function render() {
    let lib = document.querySelector(".books-view");
    lib.replaceChildren();  // replaces all children of lib
    for (const book of myLibrary) {
        let bookCard = document.createElement("div");
        bookCard.classList.add("card");


        let bookTitle = document.createElement('h3');
        bookTitle.textContent = book.title;
        bookTitle.classList.add("title");
        bookCard.appendChild(bookTitle);

        let bookAuthor = document.createElement('p');
        bookAuthor.textContent = book.author;
        bookAuthor.classList.add("author");
        bookCard.appendChild(bookAuthor);

        let bookPages = document.createElement('p');
        bookPages.textContent = book.pages;
        bookPages.classList.add("pages");
        bookCard.appendChild(bookPages);

        let bookRead = document.createElement('h3');
        bookRead.textContent = book.read;
        bookRead.classList.add("read-status");
        bookCard.appendChild(bookRead);
    }
}

let btnAdd = document.querySelector(".add-book");
const modal = document.querySelector("#dialog");
const confirmBtn = document.querySelector("#confirm-btn");

btnAdd.addEventListener("click", () => {
    dialog.showModal();
})

confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
})