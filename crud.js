const API_URL = "https://6ae7384a56b2ee1e5440352e.mockapi.io/books";

const message = document.getElementById("message");

const form = document.getElementById("bookForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const priceInput = document.getElementById("price");
const yearInput = document.getElementById("year");
const genreInput = document.getElementById("genre");

let books = [];
let editingId = null;

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

    const buttonCell = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.textContent = "수정";
    editButton.addEventListener("click", () => startEdit(book));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
      if (!confirm(`${book.title}을(를) 삭제할까요?`)) return;
      deleteBook(book.id)
        .then(() => { message.textContent = "삭제되었습니다"; })
        .catch(error => { message.textContent = `삭제에 실패했습니다: ${error.message}`; });
    });

    buttonCell.append(editButton, deleteButton);
    row.appendChild(buttonCell);

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

async function addBook(book) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  await loadBooks();
}

function startEdit(book) {
  editingId = book.id;
  titleInput.value = book.title;
  authorInput.value = book.author;
  priceInput.value = book.price;
  yearInput.value = book.year;
  genreInput.value = book.genre;
  message.textContent = "수정할 내용을 입력하고 추가 버튼을 누르세요";
}

async function updateBook(id, book) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  await loadBooks();
}

async function deleteBook(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  await loadBooks();
}

loadBooks().catch(error => {
  message.textContent = `목록 불러오는데 실패했습니다: ${error.message}`;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const book = {
    title: titleInput.value,
    author: authorInput.value,
    price: Number(priceInput.value),
    year: Number(yearInput.value),
    genre: genreInput.value
  };

  if (book.title === "") {
    message.textContent = "제목을 입력하세요.";
    return;
  }
  if (book.author === "") {
    message.textContent = "저자를 입력하세요.";
    return;
  }
  if (priceInput.value === "" || book.price < 0) {
    message.textContent = "제대로 된 가격을 입력하세요.";
    return;
  }
  if (book.year < 1900 || book.year > 2026) {
    message.textContent = "출판연도는 1900~2026년 사이로 입력하세요.";
    return;
  }

  if (editingId) {
    updateBook(editingId, book)
      .then(() => {
        message.textContent = "수정되었습니다";
        editingId = null;
        form.reset();
      })
      .catch(error => {
        message.textContent = `수정에 실패했습니다: ${error.message}`;
      });
  } else {
    addBook(book)
      .then(() => {
        message.textContent = "등록되었습니다";
        form.reset();
      })
      .catch(error => {
        message.textContent = `등록에 실패했습니다: ${error.message}`;
      });
  }
});