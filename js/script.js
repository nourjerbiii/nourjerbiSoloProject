// Dummy Data of books
const books = [
    { title: 'ANNE OF GREEN GABLES',image:'images/anne.jpg', description:'Brother and sister Marilla and Matthew Cuthbert look forward to meeting the young orphan boy whom they hope to give a good life to at their Avonlea farm, Green Gables. When they are accidentally sent Anne Shirley instead, they make the most of the orphanage mistake, and welcome the imaginative girl with loving arms. Under their care and through the friendships she forges at school,',author:'' , price: '$10.99', details: 'bookdetails.html?id=1' },
    { title: 'BEAUTY AND THE BEAST',image:'images/beauty1.jpg', description:'Beauty and the Beast and Other Classic Fairy Tales features 101 stories in which beauties and beasts capture the charm and magic of the classic fairy tale. Chosen from The Blue Fairy Book and other fairy tale collections by Andrew Lang, the selections include, in addition to the beloved title tale, a cornucopia of stories both well-known and less well-known that are a testament to the power  of stories from all countries and cultures to enchant and entertain with their fantastic characters. Beauty and the Beast and Other Classic Fairy Tales is one of Barnes & Noble Collectible Editions classics. Each volume features authoritative texts by the world greatest authors in an exquisitely designed bonded-leather binding, with distinctive gilt edging and a ribbon bookmark. Decorative, durable, and collectible, these books offer hours of pleasure to readers young and old and are an indispensable cornerstone for every home library.',author:'' , price: '$15.99', details: 'bookdetails.html?id=2' },
    { title: 'DRACULA',image:'images/dracula.jpg', description:'Dracula and Other Horror Classics collects the most memorable tales of horror by Bram Stoker. In addition to Dracula—the landmark vampire novel that set the pattern for virtually all vampire fiction written after its publication in 1897—this omnibus collects the novels The Jewel of Seven Stars and The Lair of the White Worm. In also includes a dozen of Stoker short tales of the macabre, including "Dracula Guest,"a sidebar to his famous novel. For more than a century, Bram Stoker fiction has inspired countless writers of horror and fantasy fiction. This volume allows readers a unique opportunity to appreciate the full range of his dark imagination. Dracula and Other Horror Classics is one of Barnes & Noble Collectible Editions classics. Each volume features authoritative texts by the world greatest authors, in exquisitely designed bonded-leather bindings with distinctive gilt edging and an attractive ribbon bookmark. Decorative, durable, and collectible, these books offer hours of pleasure to readers young and old and are an indispensable cornerstone for every home library.',author:'' , price: '$12.99', details: 'bookdetails.html?id=3' },
    { title: 'STAR WARS',image:'images/star_wars.jpg', description:'A long time ago in a galaxy far, far away . . . The release of George Lucas Star Wars in 1977 launched an epic saga that has changed how we view science fiction. Experience the wonder and magic of the Star Wars universe with The Star Wars Trilogy,a collection of the first three Star Wars novels and a collective exercise in modern myth-making.',author:'' , price: '$11.99', details: 'bookdetails.html?id=4' },
];

function each(array, func) { 
    for (var i = 0; i < array.length; i++) { 
          func(array[i], i); 
    } }

// This is a function to display books list in the index page
function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    each(books, function (book, index) {
        // Creating Div element inside bookItem variable
        const bookItem = document.createElement('div');
        // Adding Style
        bookItem.classList.add('book');
        bookItem.innerHTML = `<h2>${book.title}</h2><img src="${book.image}"/><p>Price: ${book.price}</p><a href="${book.details}">Details</a> <br><button onclick="buyBook(${index})">Buy</button>`;
        bookList.appendChild(bookItem);
    });
}

// Function to display book details on the details page
function displayBookDetails() {
    const bookDetails = document.getElementById('bookDetails');
    bookDetails.innerHTML = '';

    // Get book ID from the query string
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    // Display book details
    if (bookId && books[bookId - 1]) {
        const book = books[bookId - 1];
        // Creating a div element 
        const bookItem = document.createElement('div');
        bookItem.classList.add('book');
        bookItem.style.backgroundColor = 'rgb(225, 236, 236)'
        bookItem.innerHTML = `<body><h2 style="background-color:rgb(225, 236, 236)">${book.title}</h2><img style="width: 300px ; height: 300px; id ="i1" src="${book.image}"/><p >Overview:</p><p>${book.description}</p><p id="pr">Price: ${book.price}</p></body>`;
        bookDetails.appendChild(bookItem);
    } else {
        bookDetails.innerHTML = '<p>Book not found.</p>';
    }
}


// empty array  preparation for the books we will buy
let purchasedBooks = [];

// Function to handle book purchase
function buyBook(index) {
    const book = books[index];
    
    // Add the purchased book to the array
    purchasedBooks.push(book);

    // Display the updated list of purchased books
    displayPurchases();

    // Update the total sum of purchases
    updateTotalSum();
}

function removeBook(index) {
    // Remove the book from the purchasedBooks array
    purchasedBooks.splice(index, 1);

    // Display the updated list of purchased books
    displayPurchases();

    // Update the total sum of purchases
    updateTotalSum();
}


// Function to display the list of purchased books
function displayPurchases() {
    const purchasesList = document.getElementById('purchasesList');
    purchasesList.innerHTML = '';

    purchasedBooks.forEach((book, index) => {
        const purchaseItem = document.createElement('li');
        purchaseItem.innerHTML = `<span>${book.title}</span> - <span>${book.price}</span> <button onclick="removeBook(${index})">Remove</button>`;
        purchasesList.appendChild(purchaseItem);
    });
}

// Function to update the total sum of purchases
function updateTotalSum() {
    const totalSumElement = document.getElementById('totalSum');
    const totalSum = purchasedBooks.reduce(function(sum, book) { return sum + parseFloat(book.price.slice(1))},0);
    totalSumElement.textContent = `Total: $${totalSum.toFixed(2)}`;
}

// Condition to call the right function for the right page
if (window.location.pathname.includes('/bookdetails.html') ) {
    displayBookDetails();
} else {
    displayBooks();
}