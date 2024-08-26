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
const introductionproductJson = "/db.json";
const cartItems = document.querySelectorAll(".introduction_box");
console.log(cartItems);

fetch(introductionproductJson)
  .then((response) => response.json())
  .then((data) => {
    // data.oliveyoungProduct.forEach((item) => {
    //   item.price = new Intl.NumberFormat("ko-kr", { currency: "KRW" }).format(
    //     item.price
    //   );
    //   item.salePrice = new Intl.NumberFormat("ko-kr", {
    //     currency: "KRW",
    //   }).format(item.salePrice);
    // });
    productData = data.oliveyoungProduct;
    console.log(productData);

    productData.forEach((data, idx) => {
      cartItems.forEach((item, i) => {
        item.innerHTML = `
                          <div class="introduction_img">
                        <img src="${data.img}" alt="${data.id}" />
                      </div>
                      <div class="brand_content_item_info">
                      <p>${data.company}</p>
                        <h6>${data.title}</h6>
                        <div>
                          <p><span>${data.price}</span>원</p>
                          <p><span>${data.salePrice}</span>원</p>
                        </div>
                      </div>
          `;
      });
    });
  });

// const contentChange = () => {};
// contentChange();
