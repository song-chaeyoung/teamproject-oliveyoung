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

// LocalStorage Item

let cartItems = [];

const initcart = () => {
  const cartData = JSON.parse(localStorage.getItem(`cartOliveyoung`));
  // console.log("cartData check = ", cartData);
  if (cartData) {
    createItem(cartData);
  }
  cartItems = cartData;
};

const createItem = (info) => {
  info.forEach((item, index) => {
    const createHTML = () => {
      const div = document.createElement("div");
      div.classList.add("list");
      document.querySelector(".list_one").appendChild(div);
      div.innerHTML = `
                            <div class="inner">
                            <div class="list_box">
                              <div class="image">
                                <input
                                  class="listcheck"
                                  type="checkbox"
                                  id="check${item.id}"
                                />
                                <label for="check${item.id}">
                                  <i class="fa-solid fa-check"></i
                                ></label>
                                <img src="${item.img}" alt="img01" />
                              </div>
                              <div class="text">
                                <div class="text_box">
                                  <p>${item.company}</p>
                                  <p>${item.title}</p>
                                  <div class="text_inner">
                                  </div>
                                </div>
                                <div class="money">
                                  <div class="money_icon">
                                    <i class="fa-solid fa-xmark" data-index=${item.id}></i>
                                  </div>
                                  <div class="money_container">
                                    <div class="money_box" data-index=${index}>
                                      <p>${item.price}원</p>
                                      <p>${item.salePrice}원</p>
                                    </div>
                                    <div class="money_listbox">
                                      <button data-index=${index}>-</button>
                                      <p>1</p>
                                      <button data-index=${index}>+</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
      `;

      const textInner = document.querySelectorAll(".text_inner");
      const infoTag = item.tag;
      infoTag.forEach((tag, idx) => {
        const span = document.createElement("span");
        span.innerText = `${tag.name}`;
        textInner.forEach((inner) => {
          inner.appendChild(span);
        });
      });
    };

    createHTML();
  });
};
initcart();

const save = () => {
  localStorage.setItem(`cartOliveyoung`, JSON.stringify(cartItems));
};

const deleteItem = (e) => {
  const target = e.target.dataset.index;
  const targetParent =
    e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  cartItems = cartItems.filter((item) => item.id != target);
  save();
  targetParent.remove();
  productLengthEvent();
  productCalc();
};

const allDeleteBtn = document.querySelector(".totalcheck_right input");

const allDeleteEvent = () => {
  const innerAll = document.querySelectorAll(".list");
  if (!confirm("장바구니의 모든 상품을 삭제하시겠습니까?")) {
  } else {
    cartItems = [];
    save();
    innerAll.forEach((i) => {
      i.remove();
    });
  }
  productLengthEvent();
  productCalc();
};

allDeleteBtn.addEventListener("click", allDeleteEvent);

const deleteBtn = document.querySelectorAll(".fa-xmark");
deleteBtn.forEach((btn) => {
  btn.addEventListener("click", deleteItem);
});

// All Check Event
const allCheck = document.querySelector("#check7");
const checkboxs = document.querySelectorAll(".listcheck");

allCheck.addEventListener("change", () => {
  checkboxs.forEach((box) => {
    if (allCheck.checked) {
      box.checked = true;
    } else {
      box.checked = false;
    }
  });
});

checkboxs.forEach((box, idx) => {
  box.addEventListener("change", () => {
    const checked = document.querySelectorAll(
      "input[class='listcheck']:checked"
    );
    if (!box.checked) {
      allCheck.checked = false;
    }
    console.log();
    if (checkboxs.length === checked.length) {
      allCheck.checked = true;
    }
  });
});

// Money Calc
let moneyListbox = document.querySelectorAll(".money_listbox");
let moneybox = document.querySelectorAll(".money_box");
const formatter = new Intl.NumberFormat("ko-KR", {
  style: "decimal",
  currency: "KRW",
});

moneyListbox.forEach((item, idx) => {
  // console.log(cartItems);

  let clickCount = 1;
  let clickCountArray = [];
  let nomarlPrices = [];
  let discountPrices = [];

  moneybox.forEach((mItem, idx) => {
    nomarlPrices.push(
      Number(mItem.children[0].innerHTML.slice(0, -1).replace(",", ""))
    );
    discountPrices.push(
      Number(mItem.children[1].innerHTML.slice(0, -1).replace(",", ""))
    );
  });

  // function firstNum() {
  //   cartItems.forEach((i, idx) => {
  //     console.log(i.order);
  //     clickCountArray.push(i.order);
  //     // if (i.order > 1) {
  //     //   clickCountArray.push(i.order);
  //     //   // item.children[1].innerHTML = clickCount;
  //     // } else if (i.oredr == 1) {
  //     //   clickCountArray.push(i.order);
  //     // }
  //     // console.log(clickCount);
  //     const targetIdx = item.children[0].dataset.index;

  //     clacMoney(targetIdx);
  //   });
  //   console.log(clickCountArray);
  //   item.children[1].innerHTML = clickCountArray[idx];
  // }

  // firstNum();

  const countLeft = item.children[0];
  const countRight = item.children[2];
  let countNumber = Number(item.children[1].innerHTML);
  // console.log(countNumber);

  clickCount = countNumber;
  countLeft.addEventListener("click", (e) => {
    let targetIdx = Number(e.currentTarget.dataset.index);
    cartItems.forEach((cartitem, idx) => {
      console.log(clickCount);
      if (clickCount == 1) return;
      if (idx === targetIdx) {
        clickCount -= 1;
        clacMoney(targetIdx);
        productCalc();
      }
    });
    item.children[1].innerHTML = clickCount;
  });

  countRight.addEventListener("click", (e) => {
    let targetIdx = Number(e.currentTarget.dataset.index);
    cartItems.forEach((cartitem, idx) => {
      if (idx === targetIdx) clickCount += 1;
    });
    item.children[1].innerHTML = clickCount;
    clacMoney(targetIdx);
    productCalc();
  });

  let calcNomarl = 0;
  let calcDisCount = 0;
  function clacMoney(targetIdx) {
    calcNomarl = formatter.format(nomarlPrices[targetIdx] * clickCount);
    calcDisCount = formatter.format(discountPrices[targetIdx] * clickCount);

    moneybox[targetIdx].children[0].innerHTML = `${calcNomarl}원`;
    moneybox[targetIdx].children[1].innerHTML = `${calcDisCount}원`;
  }
});

// Total Calc
// Product Length
function productLengthEvent() {
  const productLength = document.querySelector(
    ".one_box .text_box p:nth-child(2)"
  );
  const listLength = document.querySelectorAll(".list").length;

  productLength.innerText = listLength;
}
productLengthEvent();

// Product Calc
function productCalc() {
  const orderPrice = document.querySelector(".pay_box .pay_one p:nth-child(2)");
  const deliveryPrice = document.querySelector(
    ".pay_box .pay_two p:nth-child(2)"
  );
  const slaePrice = document.querySelector(
    ".pay_box .pay_three p:nth-child(2)"
  );
  const totalPrice = document.querySelector(".thrid_text_box p:nth-child(2)");

  const originPriceAll = document.querySelectorAll(".money_box p:nth-child(1)");
  let originPriceNum = 0;
  originPriceAll.forEach((originprice) => {
    originPriceNum += Number(
      originprice.innerText.slice(0, -1).replace(",", "")
    );
  });
  const originPrice2 = originPriceNum;
  originPriceNum = formatter.format(originPriceNum);
  orderPrice.innerText = `${originPriceNum}원`;

  const salePriceAll = document.querySelectorAll(".money_box p:nth-child(2)");
  let slaePrieceNum = 0;
  salePriceAll.forEach((pirce) => {
    slaePrieceNum += Number(pirce.innerText.slice(0, -1).replace(",", ""));
  });
  const salePrice2 = slaePrieceNum;

  let salePriceFomatter = originPrice2 - salePrice2;
  const slaePriceFinalText = formatter.format(salePriceFomatter);
  slaePrice.innerText = `${slaePriceFinalText}원`;

  const deliveryOption = 2500;

  if (slaePrieceNum >= 40000) {
    deliveryPrice.innerText = `0원`;
  } else {
    deliveryPrice.innerText = `2,500원`;
    slaePrieceNum += deliveryOption;
  }
  slaePrieceNum = formatter.format(slaePrieceNum);
  totalPrice.innerText = `${slaePrieceNum}원`;
}
// productCalc();

// product Introduce
const introductionproductJson = "/db.json?timestamp=" + new Date().getTime();
// const cartItems = document.querySelectorAll(".introduction_box");
const cartItemsAll = document.querySelectorAll(".introduction_box");
// console.log(cartItems);

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
    cartItemsAll.forEach((item, idx) => {
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
