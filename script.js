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

        /*  bookCard.innerHTML = `
            <h3 class="title">${book.title}</h3>
            <p class="author">${book.author}</p>
            <p class="pages">${book.pages} pages</p>
            <p class="read-status">${book.read ? "Read" : "Not Read"}</p>
        `; 
        one way to do same */

        lib.appendChild(bookCard);
    }
}

let btnAdd = document.querySelector(".add-book");
const dialog = document.querySelector("#dialog");
const form = document.querySelector("form");

btnAdd.addEventListener("click", () => {
    dialog.showModal();
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);  // browser provided API that reads values from form using "name" attribute

    const title = formData.get("title");
    const author = formData.get("author");
    const pages = Number(formData.get("pages"));  // FormData return strings(or null)
    const read = formData.get("read-status") === "read";  // stores true or false where "read" is radio value inf orm

    addBookToLibrary(title, author, pages, read);
    render();

    form.reset();
    dialog.close();

})