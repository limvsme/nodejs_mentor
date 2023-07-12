import setNav from "/src/views/nav/nav.js";

const registerButton = document.querySelector("#register-button");

const nameInput = document.querySelector("#name-input");
const idInput = document.querySelector("#id-input");
const passwordInput = document.querySelector("#password-input");
const passwordConfirmInput = document.querySelector("#password-confirm-input");
const phoneNumberInput = document.querySelector("#phone-number-input");

setNav();
addAllEvents();

// addEventListener들을 묶어주는 코드
function addAllEvents() {
  registerButton.addEventListener("click", onClickRegister);
}

// 회원가입 처리
async function onClickRegister(e) {
  e.preventDefault();

  const name = nameInput.value;
  const id = idInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const phoneNumber = phoneNumberInput.value;

  if (!name) {
    return alert("이름(닉네임)을 입력해 주세요");
  } else {
    // TODO: 이름(닉네임) 입력규칙 있다면 검사
  }

  if (!id) {
    return alert("아이디(이메일)를 입력해 주세요");
  } else if (!checkEmail(id)) {
    return alert("아이디(이메일)를 울바르게 입력해 주세요");
  }

  if (!password) {
    return alert("비밀번호를 입력해 주세요");
  } else {
    // TODO: 비밀번호 입력규칙 있다면 검사
  }

  if (!passwordConfirm) {
    return alert("위에서 입력한 비밀번호를 다시 한번 입력해 주세요.");
  } else if (password !== passwordConfirm) {
    return alert("위에서 입력한 비밀번호와 동일하게 입력해 주세요.");
  }

  if (!phoneNumber) {
    return alert("연락처를 입력해 주세요.");
  } else if (!checkPhoneNumber(phoneNumber)) {
    return alert("연락처를 올바르게 입력해 주세요.");
  }

  try {
    alert("회원가입 처리");
  } catch (error) {
    console.error(error.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

/*****************************************************/
// TODO: 아래 함수들은 다른 js 파일로 옮겨야 함

// 이메일 유효성 검사
function checkEmail(str) {
  var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  if (!reg_email.test(str)) {
    return false;
  } else {
    return true;
  }
}

function checkPhoneNumber(phoneNumber) {
  return isTelFormat(phoneNumber) || isHpFormat(phoneNumber);
}

// 일반 전화번호 유효성 검사
function isTelFormat(tel) {
  if (tel == "") {
    return true;
  }
  var phoneRule = /^(070|02|0[3-9]{1}[0-9]{1})-([0-9]{3,4})-([0-9]{4})$/;
  return phoneRule.test(tel);
}

// 휴대폰 번호 유효성 검사
function isHpFormat(hp) {
  if (hp == "") {
    return true;
  }
  var phoneRule = /^(01[016789]{1})-([0-9]{3,4})-([0-9]{4})$/;
  return phoneRule.test(hp);
}
