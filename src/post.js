const currentPage = window.location.pathname;
const postForm = document.querySelector("#post-form");

const navLinks = document.querySelectorAll("nav a").forEach((link) => {
  if (link.href.includes(`${currentPage}`)) {
    link.className = "active";
  }
});

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

      //gzip compress file.

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
