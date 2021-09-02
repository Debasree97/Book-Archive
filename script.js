const searchBook = () => {
    document.getElementById("home-default").style.display = "none";
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    searchField.value = "";
    const url = ` https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data));
}


const searchResult = (books) => {

    // Displaying Total Search Result Number
    const foundResults = document.getElementById("result-number");
    document.getElementById("no-result").style.display = "none";
    foundResults.textContent = "";
    const p = document.createElement("p");
    p.classList.add("text-decoration-underline");
    p.innerHTML = `About ${books.numFound} result(s) have been found`;
    foundResults.appendChild(p);

    // Displaying Book Information
    const foundBooks = document.getElementById("search-result");
    foundBooks.textContent = "";

    if (books.docs.length === 0) {
        document.getElementById("no-result").style.display = "block";
        document.getElementById("result-number").style.display = "none";
        const errormMessage = document.getElementById("no-result");
        const div = document.createElement("div");
        div.innerHTML = `
        <p class="fs-1 pt-5">OOPS! No Result Found</p>
        <p class="fs-4 pt-1">Let's Try Again!"
        `;
        errormMessage.appendChild(div);
    }
    else {
        document.getElementById("result-number").style.display = "block";
        books.docs.slice(0, 30).forEach(book => {
            const div = document.createElement("div");
            div.classList.add("col");
            if (book.author_name === 0) {
                book.author_name = "Not Available";
            }
            div.innerHTML = `
        <div class="card h-100 p-3 bg-light text-dark shadow-sm">
            <img src="https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg" class="card-img-top img-fluid w-50 h-50 mx-auto" alt="...">
            <div class="card-body">
                <h4></h4>
                <p class="fs-6"><span class="fw-bold">Title: </span>${book.title}</p>
                <p class="fs-6"><span class="fw-bold" id="no-author-name">Author Name: </span>${book?.author_name || "Not Available"}</p>
                <p class="fs-6"><span class="fw-bold">First Publish Year: </span>${book?.first_publish_year || "Not Available"}</p>
                <p class="fs-6"><span class="fw-bold">Publisher: </span>${book?.publisher[0] || "Not Available"}</p>
            </div>
        </div>
        `;
            foundBooks.appendChild(div);
        });
    }
}
