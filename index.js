// const key = "d2f2d4fe77ce13ef79d20c7db14f8e5d"
// const getWeather = `api.openweathermap.org/data/2.5/forecast?id=524901&appid=${key}`

// fetch(getWeather)
// .then(r => r.json())
// .then(data => console.log(data))

const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a").forEach((link) => {
  if (link.href.includes(`${currentPage}`)) {
    link.className = "active";
  }
});

//home page
fetch("http://localhost:3000/news")
  .then((r) => r.json())
  .then((data) => {
    renderArticles(data);
  });
//index.html
const articlesDiv = document.querySelector("#articles");

//post.html
const postForm = document.querySelector("#post-form");

function renderArticles(articles) {
  if (currentPage.includes("index.html")) {
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
      pSummary.append(pAuthor);
      card.append(titleTag, imgTag, pSummary, a);
      articlesDiv.append(card);
    });
  }
}

function postArticle() {
  if (currentPage.includes("post.html")) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const titleInput = e.target["new-title"];
      const authorInput = e.target["author-input"];
      const linkInput = e.target["source-input"];
      const summaryInput = e.target["summary-input"];
      const fileInput = document.querySelector("#fileInputControl").files[0];
      const reader = new FileReader();

      if (
        titleInput.value === "" ||
        authorInput.value === "" ||
        linkInput.value === "" ||
        summaryInput.value === ""
      ) {
        let newArray = [titleInput, authorInput, linkInput, summaryInput];

        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i].value === "") {
            newArray[i].style.border = "thin solid red";
          }
          if(newArray[i].value !== ""){
            newArray[i].style.border = ""
          }
        }

        return alert("please fill out missing fields");
      }
      if (!fileInput) {
        let newArray = [titleInput, authorInput, linkInput, summaryInput];

        for (let i = 0; i < newArray.length; i++) {
          if(newArray[i].value !== ""){
            newArray[i].style.border = ""
          }
        }

        return alert("Please upload file");
      }
      reader.readAsDataURL(fileInput);
      reader.onload = function () {
        handlePost(reader.result);
      };

      function handlePost(string) {
        fetch("http://localhost:3000/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: titleInput.value,
            image: string,
            summary: summaryInput.value,
            author: authorInput.value,
            source: linkInput.value,
          }),
        })
          .then((r) => r.json())
          .then((data) => e.target.reset());
      }
      
    });
  }
}
postArticle();
