const plus_btn = document.querySelector(".fa-sharp.fa-solid.fa-circle-plus.fa-lg");
const minus_btn = document.querySelector(".fa-sharp.fa-solid.fa-circle-minus.fa-lg");
const item_quantity = document.querySelector(".quantity");


plus_btn.addEventListener("click", function() {
   item_quantity.value++;
});

minus_btn.addEventListener("click", function() {
    if (item_quantity.value === "1") {
      return;
    }
    item_quantity.value = parseInt(item_quantity.value) - 1;
});

item_quantity.addEventListener("input", (event) => {
    const value = event.target.value;
    if (/^\d+$/.test(value) == false) {
        alert("숫자를 입력해주세요!");
        item_quantity.value = 1;
    }
});

const itemCheckboxes = document.querySelectorAll('#select-each');

itemCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', function () {
    const row = this.parentNode.parentNode;
    if (this.checked) {
      row.classList.add('selected');
    } else {
      row.classList.remove('selected');
    }
  });
});

