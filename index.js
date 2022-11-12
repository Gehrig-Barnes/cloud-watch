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

console.log(currentPage)

//home page
fetch("http://localhost:3000/news")
.then(r => r.json())
.then(data => {
  renderArticles(data)
  
})

const articlesDiv = document.querySelector("#articles")


function renderArticles(articles){
  if (currentPage.includes('index.html')){
  articles.forEach((article) => {
    const card = document.createElement("div")
    card.className = "card"
    const titleTag = document.createElement("h1")
    titleTag.textContent = article.title
    titleTag.className = "title"
    const imgTag = document.createElement("img")
    imgTag.src = article.image
    const pSummary = document.createElement("p")
    pSummary.className = "summary"
    pSummary.textContent = article.summary
    const pAuthor = document.createElement("p")
    pAuthor.textContent = article.author
    pAuthor.className = "author"
    const a = document.createElement("a")
    a.href = article.source
    a.textContent = "Source"
    pSummary.append(pAuthor)
    card.append(titleTag, imgTag, pSummary, a)
    articlesDiv.append(card)
  }) 
  }
}




