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

// JSON~
document.addEventListener("DOMContentLoaded", function () {
  // URL에서 쿼리 파라미터로 전달된 ID 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    fetch("../db.json")
      .then((response) => response.json())
      .then((data) => {
        const product = data.oliveyoungProduct.find(
          (item) => item.id === parseInt(productId)
        );

        if (product) {
          const formatter = new Intl.NumberFormat("ko-KR", {
            style: "decimal",
            currency: "KRW",
          });

          const formattedSalePrice = formatter.format(product.salePrice);

          // 제목, 이미지, 가격 등 같은 정보를 여러 곳에서 표시하기
          document
            .querySelectorAll(".json-title")
            .forEach((el) => (el.textContent = product.title));
          document
            .querySelectorAll(".json-image")
            .forEach((el) => (el.src = product.img));
          document
            .querySelectorAll(".json-price")
            .forEach(
              (el) => (el.textContent = formatter.format(product.price))
            );
          document
            .querySelectorAll(".json-sale-price")
            .forEach((el) => (el.textContent = formattedSalePrice));
          document
            .querySelectorAll(".json-score")
            .forEach((el) => (el.textContent = product.score));
          document
            .querySelectorAll(".json-review")
            .forEach((el) => (el.textContent = `${product.review}+건 리뷰`));

          // +- 계산 버튼을 위한 코드
          const minusBtn = document.getElementById("minusBtn");
          const plusBtn = document.getElementById("plusBtn");
          const productQty = document.getElementById("productQty");
          const totalSalePriceElement =
            document.getElementById("totalSalePrice");

          // 기본 수량 및 가격 설정
          let quantity = 1;
          const unitPrice = product.salePrice;

          // 합계 가격 계산 함수
          function updateTotalPrice() {
            const totalPrice = unitPrice * quantity;
            totalSalePriceElement.textContent = formatter.format(totalPrice);
          }

          // plusBtn 클릭 시 수량 증가
          plusBtn.addEventListener("click", function () {
            quantity += 1;
            productQty.textContent = quantity;
            updateTotalPrice(); // 총 가격 업데이트
          });

          // minusBtn 클릭 시 수량 감소 (0 이하로는 내려가지 않음)
          minusBtn.addEventListener("click", function () {
            if (quantity > 1) {
              quantity -= 1;
              productQty.textContent = quantity;
              updateTotalPrice(); // 총 가격 업데이트
            }
          });

          // 초기 총합 가격 설정
          updateTotalPrice();
        } else {
          const detailElement = document.getElementById("product-detail");
          if (detailElement) detailElement.textContent = "Product not found!";
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  } else {
    const detailElement = document.getElementById("product-detail");
    if (detailElement) detailElement.textContent = "No product selected!";
  }
});

// Scroll Event
