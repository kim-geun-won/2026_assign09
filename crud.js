const API_URL = "https://6ae7384a56b2ee1e5440352e.mockapi.io/books";

const message = document.getElementById("message");
let books = [];

function renderBooks(list) {
  const bookTable = document.getElementById("bookList");
  bookTable.innerHTML = "";

  list.forEach(book => {
    const row = document.createElement("tr");
    const values = [book.id, book.title, book.author, book.price, book.year, book.genre];

    values.forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    bookTable.appendChild(row);
  });
}

async function loadBooks() {
  const response = await fetch(API_URL);
  if (!response.ok){
    throw new Error(`HTTP ${response.status}`);
  }
  books = await response.json();
  renderBooks(books);
}

loadBooks().catch(error => {
  message.textContent = `목록 불러오는데 실패했습니다: ${error.message}`;
});