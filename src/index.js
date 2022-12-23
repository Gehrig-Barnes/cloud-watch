const currentPage = window.location.pathname;
const closeButton = document.querySelector(".close-button");
const modal = document.querySelector(".modal");
const articlesDiv = document.querySelector("#articles");
const navLinks = document.querySelectorAll("nav a").forEach((link) => {
  if (link.href.includes(`${currentPage}`)) {
    link.className = "active";
  }
});

fetch("http://localhost:3000/news")
  .then((r) => r.json())
  .then((data) => {
    buildOutElements(data);
  });


function buildOutElements(articles) {
  articles.forEach((article) => {
    const card = document.createElement("div");
    const titleTag = document.createElement("h1");
    const imgTag = document.createElement("img");
    const pSummary = document.createElement("p");
    const pAuthor = document.createElement("p");
    const a = document.createElement("a");
    const deleteButton = document.createElement("button")
    addClassIdTextContent(pSummary, pAuthor,card,titleTag,imgTag,a, article, deleteButton);
  });
  addClickToCard();
  addClickToDeleteButton();
}

function addClassIdTextContent(pSummary, pAuthor, card, titleTag, imgTag, a, article, deleteButton) {
  card.className = "card";
  card.id = article.id;

  titleTag.textContent = article.title;
  titleTag.className = "title";

  imgTag.src = article.image;

  pSummary.className = "summary";
  pSummary.textContent =
    article.summary.length > 100
      ? `${article.summary.substring(0, 100)} ...`
      : article.summary;

  pSummary.id = article.id

  pAuthor.textContent = article.author;
  pAuthor.className = "author";

  a.href = article.source;
  a.textContent = "Source";
  
  deleteButton.textContent = "X"
  deleteButton.className = "delete-button"
  deleteButton.id = article.id
  appendArticles(pSummary, pAuthor, card, titleTag, imgTag, a, deleteButton);
}

function appendArticles(pSummary, pAuthor, card, titleTag, imgTag, a, deleteButton) {
  pSummary.append(pAuthor);
  card.append(deleteButton, titleTag, imgTag, pSummary, a);
  articlesDiv.append(card);
}

function addClickToCard() {
  const allSums = document.querySelectorAll(".summary");
  allSums.forEach((summary) => {
    summary.addEventListener("click", () => {
      getArticle(summary.id);
    });
  });
}

function addClickToDeleteButton(){
  const deleteButtons = document.querySelectorAll(".card button")
  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener("click", ()=>{
      deleteArticle(deleteButton.id)
    })
  })
}

function getArticle(cardId) {
  fetch(`http://localhost:3000/news/${cardId}`)
    .then((r) => r.json())
    .then((articleObj) => showModal(articleObj));
}



function deleteArticle(buttonId){
  fetch(`http://localhost:3000/news/${buttonId}`, {
    method: 'DELETE'
  })
  const allCards = document.querySelectorAll(".card")
  const cardArr = Array.from(allCards)
  const foundCard = cardArr.find((card) => {
    return card.id === buttonId
  })
  foundCard.remove()
}

function showModal(article) {
  modal.classList.toggle("show-modal");
  document.querySelector("#modal-text").textContent = article.summary
  document.querySelector("#modal-title").textContent = article.title
  window.scrollTo(500, 0)
}

closeButton.addEventListener("click", () => {
  modal.classList.toggle("show-modal");
  
});

