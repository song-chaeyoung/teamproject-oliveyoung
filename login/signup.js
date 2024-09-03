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


    document.addEventListener("DOMContentLoaded", function () {

        // 요소 불러오기
        const signId = document.getElementById("signId");
        const password1 = document.getElementById("password1");
        const password2 = document.getElementById("password2");
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const phoneNum = document.getElementById("phoneNum");
        const tokenButton = document.getElementById("token_button");
        const signupButton = document.getElementById("signup_button");
        const checkButton = document.getElementById("check_button"); // 중복확인 버튼
        const checkEmailButton = document.getElementById("check_email_button"); // 이메일 중복확인 버튼
        const agreeAllCheckbox = document.getElementById("agreeAll"); // 전체 동의 체크박스
        const requiredCheckboxes = document.querySelectorAll(".checkbox.required"); // 필수 체크박스
        const optionalCheckboxes = document.querySelectorAll(".checkbox.optional"); // 선택 체크박스
      
        // 오류 메시지 요소
        const errorId = document.getElementById("error_id");
        const errorPassword1 = document.getElementById("error_password1");
        const errorPassword2 = document.getElementById("error_password2");
        const errorWriter = document.getElementById("error_writer");
        const errorEmail = document.getElementById("error_email");
        const errorPhoneNum = document.getElementById("error_phoneNum");
        const errorAddress = document.getElementById("error_address"); // 주소 오류 메시지

        // 정규표현식
        const idRegex = /^[a-zA-Z0-9_-]{5,20}$/; // 아이디: 영문, 숫자, -, _ 허용, 5~20자
        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/; // 비밀번호 조건 : 영문, 숫자 조합, 8~16자
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 이메일: 영문자, 숫자, ".", "_", "-"만 허용
        const phoneRegex11 = /^010\d{8}$/; // 010으로 시작하는 번호는 11자리
        const phoneRegex10 = /^(011|017|018|019|016)\d{3}\d{4}$/; // 10자리 허용 (011, 017, 018, 019)
        const nameRegex = /^[가-힣]{2,}$/; // 이름: 한글만 허용, 2자 이상
      
        // 유효성 검사 함수
        function validateId() {
            if (!idRegex.test(signId.value)) {
                errorId.textContent = "아이디는 5~20자의 영문, 숫자, -, _만 사용할 수 있습니다.";
            } else {
                errorId.textContent = "";
            }
        }
      
        function validatePassword1() {
            if (!pwRegex.test(password1.value)) {
                errorPassword1.textContent = "비밀번호는 8~16자의 영문과 숫자 조합이어야 합니다.";
            } else {
                errorPassword1.textContent = "";
            }
        }
      
        function validatePassword2() {
            if (password1.value !== password2.value) {
                errorPassword2.textContent = "비밀번호가 일치하지 않습니다.";
            } else {
                errorPassword2.textContent = "";
            }
        }
      
        function validateName() {
            if (!nameRegex.test(name.value)) {
                errorWriter.textContent = "이름은 한글 2자 이상으로 입력해주세요.";
            } else {
                errorWriter.textContent = "";
            }
        }
      
        function validateEmail() {
            if (!emailRegex.test(email.value)) {
                errorEmail.textContent = "유효한 이메일 주소를 입력해주세요.";
            } else {
                errorEmail.textContent = "";
            }
        }
      
        function validatePhoneNum() {
            if (!(phoneRegex11.test(phoneNum.value) || phoneRegex10.test(phoneNum.value))) {
                errorPhoneNum.textContent = "휴대폰 번호를 정확히 입력해주세요.";
            } else {
                errorPhoneNum.textContent = "";
            }
        }

        function validateAddress() {
            const addressInput = document.getElementById("address_input").value.trim();
            const addressDetail = document.getElementById("address_detail").value.trim();
            
            if (addressInput === "") {
                errorAddress.textContent = "주소를 입력해주세요.";
                return false;
            } else if (addressDetail === "") {
                errorAddress.textContent = "상세 주소를 입력해주세요.";
                return false;
            } else {
                errorAddress.textContent = "";
                return true;
            }
        }
      
        // 아이디 중복 검사 
        checkButton.addEventListener("click", function (event) {
            event.preventDefault(); // 기본 동작 방지
            validateId();
      
            if (signId.value.trim() !== "" && idRegex.test(signId.value)) {
                const isIdAvailable = true; // 실제로는 서버와 통신해서 중복 확인
                if (isIdAvailable) {
                    alert("사용 가능한 아이디입니다.");
                } else {
                    alert("이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.");
                }
            }
        });
      
        // 이메일 중복 확인
        checkEmailButton.addEventListener("click", function (event) {
            event.preventDefault(); // 기본 동작 방지
            validateEmail();
      
            if (email.value.trim() !== "" && emailRegex.test(email.value)) {
                const isEmailAvailable = true; // 실제로는 서버와 통신해서 중복 확인
                if (isEmailAvailable) {
                    alert("사용 가능한 이메일입니다.");
                } else {
                    alert("이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.");
                }
            }
        });
      
        // "인증번호 받기" 버튼 클릭 시 유효성 검사
        tokenButton.addEventListener("click", function (event) {
            event.preventDefault(); // 기본 동작 방지
            validatePhoneNum();
      
            if (phoneRegex11.test(phoneNum.value) || phoneRegex10.test(phoneNum.value)) {
                alert("인증번호가 발송되었습니다!");
            }
        });
      
        // 폰 번호가 입력될 때마다 인증번호 버튼 활성화/비활성화
        phoneNum.addEventListener("input", function () {
            tokenButton.disabled = !(phoneRegex11.test(phoneNum.value) || phoneRegex10.test(phoneNum.value));
        });
      
        // 전체 동의 체크박스 클릭 시 필수 및 선택 체크박스 동기화
        agreeAllCheckbox.addEventListener("change", function () {
            const isChecked = agreeAllCheckbox.checked;
            requiredCheckboxes.forEach(checkbox => checkbox.checked = isChecked);
            optionalCheckboxes.forEach(checkbox => checkbox.checked = isChecked);
        });
      
        // 가입하기 버튼 클릭 시 필수 항목 및 체크박스 확인
        signupButton.addEventListener("click", function (event) {
            event.preventDefault();
      
            // 개별 유효성 검사 수행
            validateId();
            validatePassword1();
            validatePassword2();
            validateName();
            validateEmail();
            validatePhoneNum();
            
      
            const formValid = ![errorId, errorPassword1, errorPassword2, errorWriter, errorEmail, errorPhoneNum].some(error => error.textContent !== "");
      
            // 필수 체크박스 검사
            const allRequiredChecked = Array.from(requiredCheckboxes).every(checkbox => checkbox.checked);
      
            if (!formValid) {
                alert("모든 입력 항목을 올바르게 작성해주세요.");
            } else if (!allRequiredChecked) {
                alert("필수 이용약관에 동의해주세요.");
            } else {
                alert("회원가입이 완료되었습니다!");
            }
        });
      
        // 입력할 때마다 유효성 검사 실행
        signId.addEventListener("input", validateId);
        password1.addEventListener("input", validatePassword1);
        password2.addEventListener("input", validatePassword2);
        name.addEventListener("input", validateName);
        email.addEventListener("input", validateEmail);
        phoneNum.addEventListener("input", validatePhoneNum);
        requiredCheckboxes.forEach(checkbox => checkbox.addEventListener("change", validateForm));
        document.getElementById("address_input").addEventListener("input", validateAddress);
        document.getElementById("address_detail").addEventListener("input", validateAddress);
    });
      
      // Get the modal
      const modal = document.getElementById("infoModal");
      
      // Get the span element that triggers the modal
      const spans = document.querySelectorAll(".useCheck_section span");
      
      // Get the <span> element that closes the modal
      const closeBtn = document.getElementsByClassName("close")[0];
      
      // Get the confirmation button
      const confirmButton = document.getElementById("confirmButton");
      
      // When the user clicks on the span, open the modal
      spans.forEach(span => {
          span.onclick = function() {
              modal.style.display = "block";
          };
      });
      
      closeBtn.onclick = function() {
        modal.style.display = "none";
      }
      
      // When the user clicks on the confirm button, close the modal
      confirmButton.onclick = function() {
        modal.style.display = "none";
      }
      
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      
      document.getElementById('address_button').addEventListener('click', function() {
          new daum.Postcode({
            oncomplete: function(data) {
              // 선택된 주소 정보가 data로 전달됩니다.
              let addr = ''; // 주소 변수

              // 사용자가 선택한 주소 타입에 따라 주소 다르게 조합
              if (data.userSelectedType === 'R') { // 도로명 주소 선택 시
                addr = data.roadAddress;
              } else { // 지번 주소 선택 시
                addr = data.jibunAddress;
              }
      
              // 팝업에서 검색된 주소 입력
              document.getElementById("address_input").value = addr;
      
              // 상세 주소로 포커스 이동
              document.getElementById("address_detail").focus();
            }
          }).open();
      });