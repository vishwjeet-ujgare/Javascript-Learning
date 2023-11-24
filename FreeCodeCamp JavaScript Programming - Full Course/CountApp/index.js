let displayEl = document.getElementById("display-el");
let incrementBtn = document.getElementById("btn-increment");
let decrementBtn = document.getElementById("btn-decrement");
let saveBtn = document.getElementById("btn-save");
let saveEl = document.getElementById("save-el");

let count = 0;

incrementBtn.addEventListener("click", function () {
  count += 1;
  displayEl.innerText = count;
});

decrementBtn.addEventListener("click", function () {
  if (count != 0) {
    count -= 1;
    displayEl.innerText = count;
  }
});

saveBtn.addEventListener("click", function () {
  let newEntri = count + " - ";
  saveEl.innerHTML += newEntri;

  displayEl.innerText = 0;
  count=0;
});
