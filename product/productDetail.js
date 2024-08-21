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

// +- 계산 버튼

// JSON CONNECT

document.addEventListener("DOMContentLoaded", function () {
  // URL에서 쿼리 파라미터로 전달된 ID 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
      // 상품 정보를 저장한 db.json 파일에서 상품 데이터를 가져오기
      fetch("../db.json")
          .then(response => response.json())
          .then(data => {
              const product = data.oliveyoungProduct.find(item => item.id === parseInt(productId));

              if (product) {
                  // 제목, 이미지, 가격 등 같은 정보를 여러 곳에서 표시하기
                  document.querySelectorAll(".json-title").forEach(el => el.textContent = product.title);
                  document.querySelectorAll(".json-image").forEach(el => el.src = product.img);
                  document.querySelectorAll(".json-price").forEach(el => el.textContent = `${product.price}`);
                  document.querySelectorAll(".json-sale-price").forEach(el => el.textContent = `${product.salePrice}`);
                  document.querySelectorAll(".json-score").forEach(el => el.textContent = `${product.score}`);
                  document.querySelectorAll(".json-review").forEach(el => el.textContent = `${product.review}+건 리뷰`);
              } else {
                  // 상품 정보가 없을 경우 처리
                  const detailElement = document.getElementById("product-detail");
                  if (detailElement) detailElement.textContent = "Product not found!";
              }
          })
          .catch(error => {
              console.error("Error fetching product data:", error);
          });
  } else {
      // ID가 전달되지 않았을 경우 처리
      const detailElement = document.getElementById("product-detail");
      if (detailElement) detailElement.textContent = "No product selected!";
  }
});
