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

        bookCard.dataset.id = book.id;   // data -id , visible only to js ,used for these purposes only


        // let bookRead = document.createElement('h3');
        // bookRead.textContent = book.read;
        // bookRead.classList.add("read-status");
        // bookCard.appendChild(bookRead);

        // can do this also

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
            <p>${book.read ? "Read" : "Not Read"}</p>
            <button class = "toggle-btn">Toggle Read Status</button>
            <button class="remove-btn">Remove</button>
        `;


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

document.querySelector(".books-view")             // event delegation since Dynamic elements need a static parent to listen for them.
    .addEventListener("click", (e) => {
        if (!e.target.classList.contains("remove-btn") && !e.target.classList.contains("toggle-btn")) return;


        const card = e.target.closest(".card");   // closest walks upward in heirarichal to find .card 
        //cheks e,target , then its parent , its parent until it finds .card till root or returns null
        const id = card.dataset.id;  // string
        const book = myLibrary.find(book => book.id === id);

        if (e.target.classList.contains("remove-btn")) {
            const index = myLibrary.findIndex(book => book.id === id);
            // previously used : myLibrary = myLibrary.filter(book => book.id !== id);
            // doesnt work since myLibrary is const and filter returns a new array .
            if (index !== -1)
                myLibrary.splice(index, 1);
        }
        if (e.target.classList.contains("toggle-btn")) {
            book.toggleReadStatus();
        }
        render();

    })

Books.prototype.toggleReadStatus = function () {
    this.read = !this.read;   // read is true or false
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, true);

render();