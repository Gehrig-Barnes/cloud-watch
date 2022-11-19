const currentPage = window.location.pathname;
const postForm = document.querySelector("#post-form");
const navLinks = document.querySelectorAll("nav a").forEach((link) => {
  if (link.href.includes(`${currentPage}`)) {
    link.className = "active";
  }
});

function highlightEmptyInputs(title, author, link, summary) {
  let newArray = [title, author, link, summary];
  for (let i = 0; i < newArray.length; i++) {
    newArray[i].value === ""
      ? (newArray[i].style.border = "thin solid red")
      : (newArray[i].style.border = "");
  }
}

function convertToBase64(fileInput, title, summary, author, source) {
  const reader = new FileReader();
  reader.readAsDataURL(fileInput);
  return (reader.onload = function () {
    handlePost(title, reader.result, summary, author, source);
  });
}

function handlePost(title, file, summary, author, source) {
  fetch("http://localhost:3000/news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title,
      image: file,
      summary: summary,
      author: author,
      source: source,
    }),
  });
}

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = e.target["new-title"];
  const authorInput = e.target["author-input"];
  const linkInput = e.target["source-input"];
  const summaryInput = e.target["summary-input"];
  const fileInput = document.querySelector("#fileInputControl").files[0];

  if (
    titleInput.value === "" ||
    authorInput.value === "" ||
    linkInput.value === "" ||
    summaryInput.value === ""
  ) {
    highlightEmptyInputs(titleInput, authorInput, linkInput, summaryInput);
    return alert("please fill out missing fields");
  }

  if (!fileInput) {
    highlightEmptyInputs(titleInput, authorInput, linkInput, summaryInput);
    return alert("Please upload file");
  }
  convertToBase64(
    fileInput,
    titleInput.value,
    summaryInput.value,
    authorInput.value,
    linkInput.value
  );
  highlightEmptyInputs(titleInput, authorInput, linkInput, summaryInput)
  e.target.reset();
});
