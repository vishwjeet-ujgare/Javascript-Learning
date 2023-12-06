const inputEl = document.getElementById("input-el");
const saveInBtn = document.getElementById("save-input-btn");
const saveTabBtn = document.getElementById("save-tab-btn");
const listContainer = document.getElementById("list-container");
const dltBtn =document.getElementById('dlt-btn');

let urls = [];

// localStorage.clear()
displayUrls();

saveInBtn.addEventListener("click", function () {
  let inputVal = inputEl.value;
  if (inputVal != "") {
    saveUrls(inputVal);
  }
  inputEl.value = "";
});

saveTabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    saveUrls(tabs[0].url)
  });
});

dltBtn.addEventListener("dblclick", function() {
  localStorage.clear()
  myLeads = []
  displayUrls()
})


function saveUrls(url) {
  urls.push(url);
  localStorage.setItem("urls", JSON.stringify(urls));
  listContainer.innerHTML += `<li><a href='${url}' target='_blank'>${url}</a></li>`;
}


function displayUrls() {
  let itemFromLocalStorage = JSON.parse(localStorage.getItem("urls"));


  let urlsList = "";
  if (itemFromLocalStorage) {
    for (let i = 0; i < itemFromLocalStorage.length; i++) {
      urls.push(itemFromLocalStorage[i])
      urlsList += `
      <li>
           <a href='${itemFromLocalStorage[i]}' target='_blank'>
              ${itemFromLocalStorage[i]}
          </a>
      </li>
      `;

    }
    listContainer.innerHTML = urlsList;
  } else {
    let para = '<p id="message">store your urls</p>';
    listContainer.innerHTML = para;
  }
}
