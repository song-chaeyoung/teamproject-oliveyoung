
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
              loginText.textContent = '아이디 찾기';
            //   loginSubText.textContent = '휴대폰번호로 아이디 찾기';
          } else {
              loginText.textContent = '아이디 찾기';
            //   loginSubText.textContent = '이메일주소로 아이디찾기';
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
  const inputMemberName = document.querySelector(".content1 #inputId");
  const inputMemberPhoneNum = document.querySelector(".content1 #inputPw");

  // 유효성 검사 함수 - 회원 로그인
  function validateLoginForm() {
    const nameValue = inputMemberName.value.trim();
    const PhoneNumValue = inputMemberPhoneNum.value.trim();

      // 이름 입력 확인
      if (nameValue === "") {
          alert("이름을 입력하세요.");
          inputMemberName.focus();
          return false;
      }

            // 주문자명 한글 확인
            const namePattern = /^[가-힣]+$/;
            if (!namePattern.test(nameValue)) {
                alert("올바른 이름을 입력해주세요.");
                inputOrderName.value = ""; // 입력 필드 초기화
                inputOrderName.focus(); // 입력 필드에 포커스
                return false;
            }

     // 휴대혼번호 입력 확인
        if (PhoneNumValue === "") {
        alert("휴대폰번호를 입력하세요.");
        inputMemberPhoneNum.focus();
        return false;
    }

      // 휴대폰번호 조건 확인 ()
      const phoneNumPattern = /^010\d{8}$/;
      if (!PhoneNumValue.match(phoneNumPattern)) {
          alert("올바른 휴대폰 번호를 입력해주세요.");
          inputMemberPhoneNum.value = ""; // 비밀번호 필드 초기화
          inputMemberPhoneNum.focus();
          return false;
      }

      return true;
  }

  // 로그인 버튼 클릭 시 유효성 검사 실행
  loginBtn.addEventListener("click", function (e) {
      if (!validateLoginForm()) {
          e.preventDefault(); // 유효성 검사가 실패하면 form 제출 방지
      } else {
          alert("아이디 찾기 페이지로 넘어갑니다!");
      }
  });

  // 이메일주소로 아이디찾기 버튼
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
          alert("이름을 입력하세요.");
          inputOrderName.focus();
          return false;
      }

      // 주문자명 한글 확인
      const namePattern = /^[가-힣]+$/;
      if (!namePattern.test(nameValue)) {
          alert("이름은 한글로만 입력하세요.");
          inputOrderName.value = ""; // 입력 필드 초기화
          inputOrderName.focus(); // 입력 필드에 포커스
          return false;
      }

      // 주문번호 입력 확인
      if (orderNumberValue === "") {
          alert("이메일주소를 입력하세요.");
          inputOrderNumber.focus();
          return false;
      }

      // 주문번호 조건 확인 (6-12자리 숫자)
      const orderNumberPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!orderNumberPattern.test(orderNumberValue)) {
          alert("올바른 이메일주소의 형식을 입력하세요.");
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
          alert("아이디 찾기 페이지로 넘어갑니다!");
      }
  });
});