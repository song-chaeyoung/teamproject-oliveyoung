const header = document.querySelector("header");
const sidebar = document.querySelector(".sidebar_common");
const footer = document.querySelector("footer");

fetch("/component/header.html")
  .then((res) => res.text())
  .then((data) => {
    header.innerHTML = data;
    const script = document.createElement("script");
    script.src = "/component/header.js";
    script.defer = true;
    document.body.appendChild(script);
  });

fetch("/component/sidebar.html")
  .then((res) => res.text())
  .then((data) => {
    sidebar.innerHTML = data;
    const script = document.createElement("script");
    script.src = "/component/sidebar.js";
    script.defer = true;
    document.body.appendChild(script);
  });

fetch("/component/footer.html")
  .then((res) => res.text())
  .then((data) => {
    footer.innerHTML = data;
  });

// tab
const tabs = document.querySelectorAll(".tabs li");
const contents = document.querySelectorAll(".contents .content1");

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    for (let i = 0; i < tabs.length; i++) {
      let tab = tabs[i];
      tab.classList.remove("active");
    }
    for (let i = 0; i < contents.length; i++) {
      let content = contents[i];
      content.classList.remove("active");
    }
    tab.classList.add("active");
    contents[i].classList.add("active");
  });
});
// const tab1 = document.querySelector(".tab1");
// const tab2 = document.querySelector(".tab2");
// const tab3 = document.querySelector(".tab3");

// const content1 = document.querySelector(".content1");
// const content2 = document.querySelector(".content2");
// const content3 = document.querySelector(".content3");

// tab1.addEventListener("click", function () {
//   this.classList.add("active");
//   tab2.classList.remove("active");
//   tab3.classList.remove("active");
//   content1.classList.add("active");
//   content2.classList.remove("active");
//   content3.classList.remove("active");
// });

// tab2.addEventListener("click", function () {
//   this.classList.add("active");
//   tab1.classList.remove("active");
//   tab3.classList.remove("active");
//   content2.classList.add("active");
//   content1.classList.remove("active");
//   content3.classList.remove("active");
// });

// tab3.addEventListener("click", function () {
//   this.classList.add("active");
//   tab1.classList.remove("active");
//   tab2.classList.remove("active");
//   content3.classList.add("active");
//   content1.classList.remove("active");
//   content2.classList.remove("active");
// });
