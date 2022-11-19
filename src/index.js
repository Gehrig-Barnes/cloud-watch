//long term ideas. Have the user be able to change the units from imperial to Metrics system.
//also the user should have the option to change the language.

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
    renderArticles(data);
  });



function renderArticles(articles) {
    articles.forEach((article) => {
      const card = document.createElement("div");
      card.className = "card";
      const titleTag = document.createElement("h1");
      titleTag.textContent = article.title;
      titleTag.className = "title";
      const imgTag = document.createElement("img");
      imgTag.src = article.image;
      const pSummary = document.createElement("p");
      pSummary.className = "summary";
      pSummary.textContent =
        article.summary.length > 100
          ? `${article.summary.substring(0, 100)} ...`
          : article.summary;
      const pAuthor = document.createElement("p");
      pAuthor.textContent = article.author;
      pAuthor.className = "author";
      const a = document.createElement("a");
      a.href = article.source;
      a.textContent = "Source";
      // showFullSummaryOnClick(card, article)
      pSummary.append(pAuthor);
      card.append(titleTag, imgTag, pSummary, a);
      articlesDiv.append(card);
    });
}

function appendArticles(){}

function showFullSummaryOnClick(card, article) {
  card.addEventListener("click", () => {
    modal.classList.toggle("show-modal");
  });
}

closeButton.addEventListener("click", () => {
  modal.classList.toggle("show-modal");
});
