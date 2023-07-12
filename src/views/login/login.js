import setNav from "/src/views/nav/nav.js";

const idInput = document.querySelector("#id-input");
const passwordInput = document.querySelector("#password-input");
const loginButton = document.querySelector("#login-button");
const nonMemberLoginButton = document.querySelector("#non-member-login-button");

setNav();
addAllEvents();

// addEventListener들을 묶어주는 코드
function addAllEvents() {
  loginButton.addEventListener("click", onClickLogin);
  nonMemberLoginButton.addEventListener("click", onClickNonMemberLogin);
}

// 로그인 진행
async function onClickLogin(e) {
  e.preventDefault();

  const id = idInput.value;
  const password = passwordInput.value;

  if (!id) {
    return alert("아이디를 입력해 주세요");
  }

  if (!password) {
    return alert("비밀번호를 입력해 주세요");
  }
}

// TODO: 비회원 배송조회 화면으로 이동
function onClickNonMemberLogin(e) {
  e.preventDefault();
  e.stopImmediatePropagation(); // onClickLogin()가 자꾸 호출되어 막음.

  alert("비회원 로그인");

  //window.location.href = ".html";
}
