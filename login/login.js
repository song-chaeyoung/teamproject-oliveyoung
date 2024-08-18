// 젤 쉬운 버전
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

// 두번째
const tabs = document.querySelectorAll(".tabs li");
const contents = document.querySelectorAll(".contents > div");


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




// header & footer

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
    


// 로그인 & 비회원 텍스트 변경
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabs li');
  const contents = document.querySelectorAll('.contents > div');
  const loginText = document.querySelector('.loginText h2');
  const loginSubText = document.querySelector('.loginText span');

  tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
          tabs.forEach(tab => tab.classList.remove('active'));
          tab.classList.add('active');

          contents.forEach(content => content.classList.remove('active'));
          contents[index].classList.add('active');

          if(index === 0) {
              loginText.textContent = '로그인';
              loginSubText.textContent = '올리브영의 다양한 서비스와 혜택을 누리세요.';
          } else {
              loginText.textContent = '비회원 주문조회';
              loginSubText.textContent = '주문번호로 비회원 주문을 조회하세요.';
          }
      });
  });
});




// login JS
// 1. 아이디를 입력한다.
// 2. 비밀번호를 입력한다.
// 3. 로그인 버튼을 누른다.
// 3-1. 아이디와 비밀번호가 일치하지 않을 경우 '아이디 & 비밀번호를 확인하세요. 창을 띄운다'
// 3-2. 알림창을 닫으면 다시 아이디부터 입력 할 수 있도록 되돌아 온다.




// 로그인 유효성 검사
document.addEventListener("DOMContentLoaded", function () {
  // 회원 로그인 버튼
  const loginBtn = document.querySelector(".loginBtn01 button");

  // 회원 로그인 아이디와 비밀번호 입력 필드
  const inputMemberId = document.querySelector(".content1 #inputId");
  const inputMemberPw = document.querySelector(".content1 #inputPw");

  // 유효성 검사 함수 - 회원 로그인
  function validateLoginForm() {
      const idValue = inputMemberId.value.trim();
      const pwValue = inputMemberPw.value.trim();

      // 아이디 입력 확인
      if (idValue === "") {
          alert("아이디를 입력하세요.");
          inputMemberId.focus();
          return false;
      }

      // 비밀번호 입력 확인
      if (pwValue === "") {
          alert("비밀번호를 입력하세요.");
          inputMemberPw.focus();
          return false;
      }

      // 비밀번호 조건 확인 (8-12자, 최소 하나의 영문자, 하나의 숫자, 하나의 특수문자)
      const pwPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,12}$/;
      if (!pwValue.match(pwPattern)) {
          alert("비밀번호는 8-12자이며, 최소 하나의 영문자, 하나의 숫자, 하나의 특수문자를 포함해야 합니다.");
          inputMemberPw.value = ""; // 비밀번호 필드 초기화
          inputMemberPw.focus();
          return false;
      }

      return true;
  }

  // 로그인 버튼 클릭 시 유효성 검사 실행
  loginBtn.addEventListener("click", function (e) {
      if (!validateLoginForm()) {
          e.preventDefault(); // 유효성 검사가 실패하면 form 제출 방지
      } else {
          alert("올리브영 회원님 반갑습니다!");
      }
  });

  // 비회원 주문조회 버튼
  const orderBtn = document.querySelector(".orderbtn button");

  // 비회원 주문조회 - 주문자명과 주문번호 입력 필드
  const inputOrderName = document.querySelector(".content2 #inputId");
  const inputOrderNumber = document.querySelector(".content2 #inputPw");

  // 유효성 검사 함수 - 비회원 주문조회
  function validateOrderForm() {
      const nameValue = inputOrderName.value.trim();
      const orderNumberValue = inputOrderNumber.value.trim();

      // 주문자명 입력 확인
      if (nameValue === "") {
          alert("주문자명을 입력하세요.");
          inputOrderName.focus();
          return false;
      }

      // 주문자명 한글 확인
      const namePattern = /^[가-힣]+$/;
      if (!namePattern.test(nameValue)) {
          alert("주문자명은 한글로만 입력하세요.");
          inputOrderName.value = ""; // 입력 필드 초기화
          inputOrderName.focus(); // 입력 필드에 포커스
          return false;
      }

      // 주문번호 입력 확인
      if (orderNumberValue === "") {
          alert("주문번호를 입력하세요.");
          inputOrderNumber.focus();
          return false;
      }

      // 주문번호 조건 확인 (6-12자리 숫자)
      const orderNumberPattern = /^\d{6,12}$/;
      if (!orderNumberPattern.test(orderNumberValue)) {
          alert("주문번호는 6-12자리 숫자로 입력하세요.");
          inputOrderNumber.value = ""; // 주문번호 필드 초기화
          inputOrderNumber.focus(); // 주문번호 입력 필드에 포커스
          return false;
      }

      return true;
  }

  // 비회원 주문조회 버튼 클릭 시 유효성 검사 실행
  orderBtn.addEventListener("click", function (e) {
      if (!validateOrderForm()) {
          e.preventDefault(); // 유효성 검사가 실패하면 form 제출 방지
      } else {
          alert("주문 조회 성공!");
      }
  });
});