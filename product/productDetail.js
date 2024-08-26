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

document.addEventListener("DOMContentLoaded", function () {
  // 1. JSON 데이터 처리 및 DOM 업데이트
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

          // 2. 수량 증가/감소 및 가격 업데이트
          const minusBtn = document.getElementById("minusBtn");
          const plusBtn = document.getElementById("plusBtn");
          const productQty = document.getElementById("productQty");
          const totalSalePriceElement =
            document.getElementById("totalSalePrice");

          let quantity = 1;
          const unitPrice = product.salePrice;

          function updateTotalPrice() {
            const totalPrice = unitPrice * quantity;
            totalSalePriceElement.textContent = formatter.format(totalPrice);
          }

          plusBtn.addEventListener("click", function () {
            quantity += 1;
            productQty.textContent = quantity;
            updateTotalPrice();
          });

          minusBtn.addEventListener("click", function () {
            if (quantity > 1) {
              quantity -= 1;
              productQty.textContent = quantity;
              updateTotalPrice();
            }
          });

          updateTotalPrice(); // 초기 총합 가격 설정
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

  // 3. 탭 클릭 시 스크롤 및 모달 창 기능
  const detailTab = document.getElementById("tab-detail-desc");
  const reviewTab = document.getElementById("tab-review");
  const noticeTab = document.getElementById("tab-notice");
  const inquiryTab = document.getElementById("tab-inquiry");

  const firstImage = document.querySelector(
    "#detail-section .imgs img:first-child"
  );
  const firstReview = document.querySelector("#TAB02 .review-main");

  const noticeModal = document.getElementById("noticeModal");
  const inquiryModal = document.getElementById("inquiryModal");

  const closeNoticeBtn = document.getElementById("closeNotice");
  const closeInquiryBtn = document.getElementById("closeInquiry");

  if (detailTab && firstImage) {
    detailTab.addEventListener("click", function () {
      firstImage.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (reviewTab && firstReview) {
    reviewTab.addEventListener("click", function () {
      firstReview.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (noticeTab) {
    noticeTab.addEventListener("click", function () {
      noticeModal.style.display = "block";
    });
  }

  if (inquiryTab) {
    inquiryTab.addEventListener("click", function () {
      inquiryModal.style.display = "block";
    });
  }

  if (closeNoticeBtn) {
    closeNoticeBtn.addEventListener("click", function () {
      noticeModal.style.display = "none";
    });
  }

  if (closeInquiryBtn) {
    closeInquiryBtn.addEventListener("click", function () {
      inquiryModal.style.display = "none";
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === noticeModal) {
      noticeModal.style.display = "none";
    } else if (event.target === inquiryModal) {
      inquiryModal.style.display = "none";
    }
  });
});
