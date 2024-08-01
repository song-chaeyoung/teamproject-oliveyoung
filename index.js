const header = document.querySelector("header");
const sidebar = document.querySelector(".sidebar_common");
const footer = document.querySelector("footer");

fetch("./component/header.html")
  .then((res) => res.text())
  .then((data) => {
    header.innerHTML = data;
    const script = document.createElement("script");
    script.src = "/component/header.js";
    script.defer = true;
    document.body.appendChild(script);
  });

fetch("./component/sidebar.html")
  .then((res) => res.text())
  .then((data) => {
    sidebar.innerHTML = data;
    const script = document.createElement("script");
    script.src = "/component/sidebar.js";
    script.defer = true;
    document.body.appendChild(script);
  });

fetch("./component/footer.html")
  .then((res) => res.text())
  .then((data) => {
    footer.innerHTML = data;
  });

// fetch("./index.html")
//   .then((res) => res.text())
//   .then((data) => (header.innerHTML = data));

// fetch("./component/header.html")
//   .then((res) => res.text())
//   .then((data) => (header.innerHTML = data));

// fetch("./component/header.html")
//   .then((res) => res.text())
//   .then((data) => {
//     header.innerHTML = data;

//     // 삽입된 HTML 내의 script 태그 찾아 실행
//     const scripts = header.querySelectorAll("script");
//     scripts.forEach((script) => {
//       const newScript = document.createElement("script");
//       newScript.textContent = script.textContent;
//       doc;
//       ument.head.appendChild(newScript);
//     });

// // 삽입된 HTML 내의 link 태그 찾아 추가
// const styles = header.querySelectorAll('link[rel="stylesheet"]');
// styles.forEach((style) => {
//   const newLink = document.createElement("link");
//   newLink.rel = "stylesheet";
//   newLink.href = style.href;
//   document.head.appendChild(newLink);
// });
// });

// fetch("./component/header.html")
//   .then((response) => response.text())
//   .then((html) => {
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = html;
//     document.body.appendChild(tempDiv);

//     // DOMContentLoaded 이벤트를 기다린 후 클래스 값 찾기
//     document.addEventListener("DOMContentLoaded", () => {
//       const elements = document.querySelectorAll(".header_left_category");
//       // elements를 활용하여 원하는 작업 수행
//     });
//   });

// async function fetchAndParseHtml() {
//   const response = await fetch("./component/header.html");
//   const html = await response.text();
//   const tempDiv = document.createElement("div");
//   tempDiv.innerHTML = html;
//   document.body.appendChild(tempDiv);

//   const elements = document.querySelectorAll(".header_left_category");
//   // elements를 활용하여 원하는 작업 수행
// }

// fetchAndParseHtml();
