const searchBook = () => {
    const searchText = document.getElementById("search-field").value;
    searchText.value = "";
    const url = ` http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));
}