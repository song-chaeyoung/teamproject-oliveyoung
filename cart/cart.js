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
const contents = document.querySelectorAll(
  ".contents .content1, .contents .content2"
);

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

// const content1 = document.querySelector(".content1");
// const content2 = document.querySelector(".content2");

// tab1.addEventListener("click", function () {
//   this.classList.add("active");
//   tab2.classList.remove("active");
//   tab3.classList.remove("active");
//   content1.classList.add("active");
//   content2.classList.remove("active");
// });

// tab2.addEventListener("click", function () {
//   this.classList.add("active");
//   tab1.classList.remove("active");
//   tab3.classList.remove("active");
//   content2.classList.add("active");
//   content1.classList.remove("active");
// });

// tab3.addEventListener("click", function () {
//   this.classList.add("active");
//   tab1.classList.remove("active");
//   tab2.classList.remove("active");

//   content1.classList.remove("active");
// });

// JSON 데이터 파일 URL
const introductionproductJson = "/db.json?timestamp=" + new Date().getTime();
const cartItems = document.querySelectorAll(".introduction_box");
console.log(cartItems);

// 랜덤 섞기 함수 (Fisher-Yates 알고리즘)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // 요소 스와핑
  }
  return array;
}

fetch(introductionproductJson)
  .then((response) => response.json())
  .then((data) => {
    // 가격 포맷팅
    data.oliveyoungProduct.forEach((item) => {
      item.price = new Intl.NumberFormat("ko-kr", { currency: "KRW" }).format(
        item.price
      );
      item.salePrice = new Intl.NumberFormat("ko-kr", {
        currency: "KRW",
      }).format(item.salePrice);
    });

    // 제품 데이터 섞기
    const productData = shuffleArray(data.oliveyoungProduct);

    // DOM 업데이트
    cartItems.forEach((item, idx) => {
      if (idx < productData.length) {
        const product = productData[idx];

        item.innerHTML = `
            <div class="introduction_img">
            <img src="${product.img}" alt="${product.id}" />
          </div>
          <div class="text_container">
            <div class="text_box">
              <p>${product.title}</p>
            </div>
            <div class="introduction_pay">
              <p>${product.price}원</p>
              <p>${product.salePrice}원</p>
            </div>
          </div>
          `;
      }
    });
  })
  .catch((error) => console.error("Error fetching the JSON:", error));
