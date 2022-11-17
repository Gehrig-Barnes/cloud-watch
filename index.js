//long term ideas. Have the user be able to change the units from imperial to Metrics system.
//also the user should have the option to change the language.

const currentPage = window.location.pathname;
const closeButton = document.querySelector(".close-button");
const modal = document.querySelector(".modal");

const navLinks = document.querySelectorAll("nav a").forEach((link) => {
  if (link.href.includes(`${currentPage}`)) {
    link.className = "active";
  }
});
if (currentPage.includes("weather.html")) {
  const show = document.querySelector("#show-forecast");
  const searchForm = document.querySelector("#search-form");
  const pParent = document.querySelector("#hold-p");

  searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
    const zipCode = e.target["search-input"].value;
    const key = "d2f2d4fe77ce13ef79d20c7db14f8e5d";
    const getWeather = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${key}`;
    fetch(getWeather)
      .then((r) => r.json())
      .then((data) => {
        getCurrentWeather(data.lat, data.lon, key);

        if (show.textContent === "show forecast") {
          show.addEventListener("click", () => {
            getWeatherForecast(data.lat, data.lon, key);
          });
        }
      });
  });

  function getCurrentWeather(lat, lon, key) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
    )
      .then((r) => r.json())
      .then((data) => console.log(data));
  }

  function getWeatherForecast(lat, lon, key) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
    )
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        pParent.removeChild(show);
        console.log(pParent);
      });
  }
}

//okay, so we don't have to create a card for reach one. We can just have 5 cards that are already statically built.
//so when we submit, we can get the data for all the

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
//to do: fade in rendering. So when we click on a card, we want the card to show more details.
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
      showFullSummaryOnClick(card, article)
      pSummary.append(pAuthor);
      card.append(titleTag, imgTag, pSummary, a);
      articlesDiv.append(card);
    });
  }
}

function showFullSummaryOnClick(card, article){
  card.addEventListener("click", ()=>{
    modal.classList.toggle("show-modal")

  })
}

closeButton.addEventListener("click", ()=>{
  modal.classList.toggle("show-modal")
})

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
          if (newArray[i].value !== "") {
            newArray[i].style.border = "";
          }
        }

        return alert("please fill out missing fields");
      }
      if (!fileInput) {
        let newArray = [titleInput, authorInput, linkInput, summaryInput];

        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i].value !== "") {
            newArray[i].style.border = "";
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
