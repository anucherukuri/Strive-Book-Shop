
const loadBooks = (filter) => {
    return fetch("https://striveschool-api.herokuapp.com/books")
      .then((response) => response.json())
      .then((books) => {
        displayBooks(books, filter)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  
  const displayBooks = (books, filter) => {
    const booksContainer = document.querySelector("#books-container")
    booksContainer.innerHTML = ""
  
    books
      .filter((book) => book.title.toLowerCase().includes(filter.toLowerCase()))
      .forEach((book) => {
        let cardNode = document.createElement("div")
        cardNode.classList.add("col-3", "mb-3")
        cardNode.innerHTML = `<div class="card h-175 mb-3">
    <img src="${book.img}" class="card-img-top " style=" height:300px; object-fit:cover" alt="${book.title}">
    <div class="card-body">
      <h5 class="card-title text-truncate">${book.title}</h5>
      <p class="card-text">${book.category.toUpperCase()}</p>
      <p class="card-text">€${book.price}</p>
      
      <a href="#" onclick="addToCart(this)" return false;" class="btn btn-primary ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg> Add to Cart</a>
      <a href="#" onclick="skip(this)" class="btn btn-warning ">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-skip-end" viewBox="0 0 16 16">
        <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0V4zM5 4.633 10.804 8 5 11.367V4.633z"/>
        </svg> Skip </a>
     
    </div>
  </div>`
        booksContainer.appendChild(cardNode)
      })
  }
  
  //To add to cart 
  const addToCart = (target) => {
    let bookCard = target.parentNode.parentNode
  
    let cartContainer = document.getElementById("cart-container")
    let bookCardClone = bookCard.cloneNode(true)
    let imgNode = bookCardClone.querySelector("img")
    imgNode.style.height = "100px"
    imgNode.style.width = "object-fit:cover"
  
    let deleteButton = bookCardClone.querySelector("a:first-of-type")
    deleteButton.innerText = "Delete"
  
    deleteButton.onclick = deleteFromCart
    let skipButton = bookCardClone.querySelector("a:last-of-type")
    skipButton.remove()
    cartContainer.appendChild(bookCardClone)
  
    bookCard.classList.add("in-cart")
  }
  //Skip button function
  const skip = (target) => {
    target.parentNode.parentNode.parentNode.classList.add("collapse")
  }
  
  //Search Bar Set up
  const setupSearch = () => {
    let searchNode = document.getElementById("filter-books")
    searchNode.addEventListener("keyup", filterBooks)
  }

  //To filter books
  const filterBooks = (eventData) => {
    let filter = eventData.target.value
    if (filter.length >= 3 || filter.length == 0) {
      loadBooks(eventData.target.value)
    }
  }
  
  //To delete Cart
  const deleteFromCart = (eventData) => {
    eventData.target.parentNode.parentNode.remove()
  }
  
  window.onload = () => {
    loadBooks("");
    setupSearch();
  }