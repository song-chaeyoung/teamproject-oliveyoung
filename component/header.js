// Header Fixed
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if (window.scrollY > 100) header.classList.add("active");
  else header.classList.remove("active");
});

// Category Evnet
const categoryBtn = document.querySelector(".header .header_left_category");

categoryBtn.addEventListener("click", () => {
  const category = document.querySelector(".haeder_category_container");
  const categoryXmark = category.querySelector(".haader_category_xmark");

  category.classList.toggle("active");
  categoryXmark.addEventListener("click", () => {
    category.classList.remove("active");
  });
});
