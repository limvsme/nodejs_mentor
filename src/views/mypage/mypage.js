import setNav from "/src/views/nav/nav.js";

const accountSecurity = document.querySelector("#account-security");
const accountOrders = document.querySelector("#account-orders");

setNav();
addAllEvents();

// addEventListener들을 묶어주는 코드
function addAllEvents() {
  accountSecurity.addEventListener("click", onClickAccountSecurity);
  accountOrders.addEventListener("click", onClickAccountOrders);
}

function onClickAccountSecurity() {
  window.location.href = "../account-security/account-security.html";
}

function onClickAccountOrders() {
  window.location.href = "../account-orders/account-orders.html";
}
