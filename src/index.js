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
    addClassIdTextContent(pSummary, pAuthor,card,titleTag,imgTag,a, article);
  });
  addClickToCard();
}

function addClassIdTextContent(
  pSummary,
  pAuthor,
  card,
  titleTag,
  imgTag,
  a,
  article
) {
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

  pAuthor.textContent = article.author;
  pAuthor.className = "author";

  a.href = article.source;
  a.textContent = "Source";
  appendArticles(pSummary, pAuthor, card, titleTag, imgTag, a);
}

function appendArticles(pSummary, pAuthor, card, titleTag, imgTag, a) {
  pSummary.append(pAuthor);
  card.append(titleTag, imgTag, pSummary, a);
  articlesDiv.append(card);
}

function addClickToCard() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.addEventListener("click", () => {
      getArticle(card.id);
    });
  });
}

function getArticle(cardId) {
  fetch(`http://localhost:3000/news/${cardId}`)
    .then((r) => r.json())
    .then((articleObj) => showModal(articleObj));
}

function showModal(article) {
  console.log(article);
  modal.classList.toggle("show-modal");
  document.querySelector("#modal-text").textContent = article.summary
}

closeButton.addEventListener("click", () => {
  modal.classList.toggle("show-modal");
  
});

