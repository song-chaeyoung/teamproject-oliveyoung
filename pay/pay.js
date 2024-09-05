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

// 우편번호api
function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        document.getElementById("address").value = extraAddr;
      } else {
        document.getElementById("address").value = "";
      }

      document.getElementById("second").value = data.zonecode;
      document.getElementById("second").value = addr;
    },
  }).open();
}

// 유효성검사
document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.querySelector("button");

  const nameId = document.getElementById("name");
  const phoneNum = document.getElementById("phoneNum");
  const phoneNumId = document.getElementById("phone");
  const email = document.getElementById("email");

  const delivery = document.getElementById("delivery");
  const address = document.getElementById("address");

  const phoneNums = document.getElementById("phoneNums");

  const payCheckbox = document.getElementById("pay");

  const errorname = document.getElementById("error_name");
  const errorPhoneNum = document.getElementById("error_phoneNum");
  const erroremail = document.getElementById("error_email");
  const errordelivey = document.getElementById("error_delivey");
  const erroraddress = document.getElementById("error_address");

  const errorphonenum = document.getElementById("error_phoneNums");
  const errorPay = document.getElementById("error_pay");

  const phoneRegex11 = /^010\d{8}$/; // 010으로 시작하는 번호는 11자리
  const phoneRegex10 = /^(011|017|018|019|016)\d{3}\d{4}$/; // 10자리 허용 (011, 017, 018, 019)
  const nameRegex = /^[가-힣]{2,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const deliveyRegex = /^[가-힣]{2,}$/;
  const addressRegex = /^[가-힣0-9\s\-\.,/()&]+$/;
  const secondRegex = /^[가-힣0-9\s\-\.,/()&]+$/;
  const phoneNumsRegex1 = /^010\d{8}$/;
  const phoneNumsRegex2 = /^(011|017|018|019|016)\d{3}\d{4}$/;

  function validateLoginForm() {
    let isValid = true;

    const nameValue = nameId.value.trim();
    const phoneNumValue = phoneNum.value.trim();
    const emailValue = email.value.trim();
    const deliveryValue = delivery.value.trim();
    const addressValue = address.value.trim();
    const phoneNumsValue = phoneNums.value.trim();

    if (nameValue.length < 2 || !nameRegex.test(nameValue)) {
      errorname.textContent =
        "이름은 한글만 입력할 수 있으며 2글자 이상이어야 합니다.";
      isValid = false;
    } else {
      errorname.textContent = "";
    }

    if (
      !phoneNumsRegex1.test(phoneNumValue) &&
      !phoneNumsRegex2.test(phoneNumValue)
    ) {
      errorPhoneNum.textContent = "유효한 연락처를 입력하세요.";
      isValid = false;
    } else {
      errorPhoneNum.textContent = "";
    }

    if (emailValue.length < 5 || !emailRegex.test(emailValue)) {
      erroremail.textContent = "올바른 이메일 주소를 입력하세요.";
      isValid = false;
    } else {
      erroremail.textContent = "";
    }

    if (deliveryValue.length < 2 || !deliveyRegex.test(deliveryValue)) {
      errordelivey.textContent = "받으시는 분의 이름을 입력해주세요.";
      isValid = false;
    } else {
      errordelivey.textContent = "";
    }

    if (addressValue === "" || !addressRegex.test(addressValue)) {
      erroraddress.textContent = "주소를 입력해 주세요.";
      isValid = false;
    } else {
      erroraddress.textContent = "";
    }

    if (
      !phoneNumsRegex1.test(phoneNumsValue) &&
      !phoneNumsRegex2.test(phoneNumsValue)
    ) {
      errorphonenum.textContent = "유효한 휴대폰번호를 입력하세요.";
      isValid = false;
    } else {
      errorphonenum.textContent = "";
    }

    return isValid;
  }

  function validateCheckbox() {
    const btnChecked = payCheckbox.checked;
    if (!btnChecked) {
      errorPay.textContent = "";
      alert("필수동의 해주세요");
      return false;
    }
    errorPay.textContent = "";
    return true;
  }

  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const isFormValid = validateLoginForm();
    const isCheckboxValid = validateCheckbox();

    if (isFormValid && isCheckboxValid) {
      window.location.href = "/pay/payfinish.html";
    }
  });
});

// Cart Data
let cartItems = [];

const initcart = () => {
  const cartData = JSON.parse(localStorage.getItem("cartOliveyoung"));
  cartItems = cartData;
  if (cartItems) {
    cartItems.forEach((item) => {
      creatItem(item);
    });
  }
};

const formatter = new Intl.NumberFormat("ko-KR", {
  currency: "KRW",
});

const creatItem = (item) => {
  const itemInnerBoxs = document.querySelector(".item_inner_boxs");
  const div = document.createElement("div");
  div.classList.add("item_inner_box");
  itemInnerBoxs.append(div);

  let salePriceOrder = 0;
  if (typeof item.salePrice == "string") {
    salePriceOrder =
      Number(item.salePrice.replace(",", "")) * Number(item.order);
  } else if (typeof item.salePrice == "number") {
    salePriceOrder = item.salePrice * Number(item.order);
  }

  let priceOrder = 0;
  if (typeof item.price == "string") {
    priceOrder = Number(item.price.replace(",", "")) * Number(item.order);
  } else if (typeof item.salePrice == "number") {
    priceOrder = item.price * Number(item.order);
  }

  priceOrder = formatter.format(priceOrder);
  salePriceOrder = formatter.format(salePriceOrder);
  div.innerHTML = ` 
                      <div class="item_inner">
                      <div class="item_img">
                        <img src="${item.img}" alt="${item.id}" />
                      </div>
                      <div class="item_img_text">
                        <h3>${item.title}</h3>
                        <p>${item.order}개</p>
                        <div class="tags"></div>
                      </div>
                    </div>
                    <div class="item_img_pay">
                      <p>${salePriceOrder}원</p>
                      <p>${priceOrder}원</p>
                    </div>
  `;

  const itemTags = item.tag;

  itemTags.forEach((tag) => {
    const tags = document.querySelectorAll(".tags");

    const p = document.createElement("p");
    p.innerText = tag.name;
    tags.forEach((inner) => {
      inner.appendChild(p);
    });
  });
};

initcart();

// price Calc
const orderPrice = document.querySelector(".orderpirce");
const salePrice = document.querySelector(".salepirce");
const deliveryPrice = document.querySelector(".deliverypirce");
const finalPrice = document.querySelector(".finalpirce");

const productSalePrices = document.querySelectorAll(
  ".item_img_pay p:nth-child(1)"
);
const productPrices = document.querySelectorAll(".item_img_pay p:nth-child(2)");

let salePirceArray = [];
let pirceArray = [];
productSalePrices.forEach((price) => {
  const eachPrice = price.innerText.slice(0, -1).replace(",", "");
  salePirceArray.push(eachPrice);
});
productPrices.forEach((price) => {
  const eachPrice = price.innerText.slice(0, -1).replace(",", "");
  pirceArray.push(eachPrice);
});

let productPrice = 0;
pirceArray.forEach((price) => {
  // console.log(price);
  productPrice += Number(price);
});

let finalPriceNum = 0;
salePirceArray.forEach((price) => {
  finalPriceNum += Number(price);
});

let deliPriceNum = 0;
if (finalPriceNum < 40000) {
  deliveryPrice.innerText = "2,500원";
  deliPriceNum = 2500;
} else {
  deliveryPrice.innerText = "무료";
  deliPriceNum = 0;
}
finalPriceNum += deliPriceNum;

let minusNum = productPrice - finalPriceNum;

minusNum = formatter.format(minusNum);
salePrice.innerHTML = `-${minusNum}원`;

productPrice = formatter.format(productPrice);
orderPrice.innerHTML = `${productPrice}원`;
finalPriceNum = formatter.format(finalPriceNum);
finalPrice.innerHTML = `${finalPriceNum}원`;
