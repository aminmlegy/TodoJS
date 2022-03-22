let Form = document.querySelector("form"),
  inputText = document.querySelector(".text"),
  listItems = document.querySelector(".list");
class Todo {
  constructor() {
    this.arr = JSON.parse(localStorage.getItem("items")) || [];
    this.ifff;
  }
  add(idTodo, todoVal) {
    this.arr.push({ idTodo: idTodo, todoVal: todoVal });
    localStorage.setItem("items", JSON.stringify(this.arr));
  }
  showItems() {
    listItems.innerHTML = "";
    this.arr.forEach((element) => {
      listItems.innerHTML += `
        <div class="item">
        <div class="text">
            ${element.todoVal}
        </div>
        <div class="option">
            <span class="delete" data-id="${element.idTodo}">&cross;</span>
            <span class="edit" data-edit="${element.idTodo}">&orarr;</span>
        </div>
      </div>
        `;
    });
  }
  deleteItem(id) {
    let NewLocal = this.arr.filter((item) => {
      return item.idTodo !== +id;
    });
    localStorage.setItem("items", JSON.stringify(NewLocal));
    this.arr = JSON.parse(localStorage.getItem("items"));
  }
  // edit(id) {
  //   let findItem = { idTodo: id, todoVal: inputText.value.trim() };
  //   inputText.value = findItem.todoVal;
  //   let editItem = this.arr.map((item) => {
  //     return item.idTodo === findItem.idTodo ? findItem : item;
  //   });
  //   localStorage.setItem("items", JSON.stringify(editItem));
  //   this.arr = JSON.parse(localStorage.getItem("items"));
  // }
}

let appTodo = new Todo();

if (appTodo.arr.length) {
  appTodo.showItems();
}

Form.addEventListener("submit", (e) => {
  e.preventDefault();
  let idRandoum = Math.floor(Math.random() * 1000000);
  if (inputText.value !== "") {
    appTodo.add(idRandoum, inputText.value.trim());
  }
  appTodo.showItems();
  inputText.value = "";
});

document.addEventListener("click", (e) => {
  if (e.target.className === "delete") {
    appTodo.deleteItem(e.target.dataset.id);
    e.target.parentElement.parentElement.remove();
  }
  // else if (e.target.className === "edit") {
  //   appTodo.ifff = e.target.dataset.edit;
  //   appTodo.edit(e.target.dataset.edit);
  // }
});
