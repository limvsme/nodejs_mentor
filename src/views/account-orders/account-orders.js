// 이 화면의 동작
// 1. '오늘' 버튼이 기본 설정이며, 주문 내역이 없으면 테이블에 '주문내역이 없습니다.'라는 문구만 표시
// 2. 주문 내역이 있다면 동적으로 row를 생성해서 배치하며, 한 번에 최대 4개까지 배치
// 2-1. 동적 생성시에 각 row의 배송정보수정, 주문취소 버튼의 이벤트리스너 등록시에 해당 주문의 번호를 인자로 널어, 버튼 클릭시에 각 주문번호에 맞게 대응할 수 있도록 함.
// 3. 주문 내역이 5건 이상이라면 하단에 그 넘어간 수만큼 페이지를 이동할 수 있는 숫자 버튼 표시
// 4. 달력에 대한 동작도 구현해야함

import setNav from "/src/views/nav/nav.js";

const filterButtonList = document.querySelectorAll(".button.is-outlined");
const orderListBody = document.querySelector("#order-list-body");

setNav();
addAllEvents();
requestOrderData();

// addEventListener들을 묶어주는 코드
function addAllEvents() {
  // 각 기간별 버튼의 click 이벤트 인자로 고유의 id를 넣는다
  for (let i = 0; i < filterButtonList.length; ++i)
    filterButtonList[i].addEventListener("click", (e) => {
      onClickFilterButton(i);
    });

  // 오늘 버튼을 포커스 상태로 설정
  filterButtonList[0].focus();
}

// 필터 버튼 처리
function onClickFilterButton(id) {
  alert(id);
}

// TODO: 더미데이터 지우고 서버요청 보내야함
async function requestOrderData() {
  // 임시로 더미 json 파일 가져다가 화면에 표시
  try {
    const response = await fetch("dummy-orders.json");
    const jsonData = await response.json();
    //console.log(data);

    for (const order of jsonData.dummyData) {
      createRow(order);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

function createRow(order) {
  // 날짜
  let dateCell = document.createElement("td");
  dateCell.textContent = order.orderDate;

  // 주문정보
  let productListCell = document.createElement("td");
  let temp = "";
  order.orderProductList.forEach((product) => {
    temp += `${product.name} / ${product.count}권<br>`;
  });
  console.log(temp);
  productListCell.innerHTML = temp;

  // 상태
  let stateCell = document.createElement("td");
  stateCell.textContent = order.orderState;

  // 신청
  let requestCell = document.createElement("td");
  let editShippingDataButton = document.createElement("button");
  let cancelOrderButton = document.createElement("button");
  editShippingDataButton.className = "button is-rounded";
  editShippingDataButton.innerText = "배송정보 수정";
  cancelOrderButton.className = "button is-rounded";
  cancelOrderButton.innerText = "주문 취소";
  requestCell.appendChild(editShippingDataButton);
  requestCell.appendChild(document.createElement("br"));
  requestCell.appendChild(cancelOrderButton);

  let newRow = document.createElement("tr");
  newRow.appendChild(dateCell);
  newRow.appendChild(productListCell);
  newRow.appendChild(stateCell);
  newRow.appendChild(requestCell);

  orderListBody.appendChild(newRow);
}
