// Importing Firebase modules for initialization and database operations
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration settings
const appSettings = {
  databaseURL:
    "https://shopping-list-78ac4-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initializing the Firebase app
const app = initializeApp(appSettings);

// Retrieving the Realtime Database instance
const database = getDatabase(app);

// Creating a pointer to the "Shopping-List" data node within the database
const shoppingDB = ref(database, "Shopping-List");

// Getting DOM elements
const inputEl = document.getElementById("input-el");
const btn = document.getElementById("btn");
const shoppingListContainer = document.getElementById("shopping-list-container");

// Setting focus on the input element
inputEl.focus();

// Event listener to update the shopping list when the database changes
onValue(shoppingDB, function (snapshot) {
  if (snapshot.exists()) {
    // If data exists in the database, clear the field and render the shopping list
    clearField();
    let shoppingListItemsArray = Object.entries(snapshot.val());
    for (const item in shoppingListItemsArray)
      addItemToShoppingList(shoppingListItemsArray[item]);
  } else {
    // If no data in the database, display a message
    shoppingListContainer.innerHTML = "No items here... yet";
  }
});

// Event listener for the "Add" button
btn.addEventListener("click", function () {
   let item = inputEl.value;

  // Check if the input is not empty
  if (item.trim() != "") {
    push(shoppingDB, item);
  }
});

// Function to add an item to the shopping list
function addItemToShoppingList(item) {
  let itemID = item[0];
  let itemValue = item[1];

  // Create an li element and append it to the shopping list container
  let li = document.createElement("li");
  li.textContent = itemValue;
  li.title="Double click to delete item"
  shoppingListContainer.append(li);

  // Event listener for double-click to remove an item from the shopping list
  li.addEventListener("dblclick", function () {
    let exactLocationOfItemInDB = ref(database, `Shopping-List/${itemID}`);
    remove(exactLocationOfItemInDB);
  });
}

// Function to clear the input field and shopping list container
function clearField() {
  inputEl.value = "";
  inputEl.focus();
  shoppingListContainer.innerHTML = "";
}
