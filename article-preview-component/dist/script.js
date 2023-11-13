const shareBtn = document.querySelector("#share-btn");
const activeLinks = document.querySelector(".active-links");

const toggleLinks = () => {
  activeLinks.classList.toggle("hide");
};

shareBtn.addEventListener("click", toggleLinks);

document.addEventListener("click", (e) => {
  const target = e.target;
  if (!target.classList.contains("share-btn")) {
    if (!activeLinks.classList.contains("hide")) {
      activeLinks.classList.add("hide");
    }
  }
});
