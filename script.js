let Form = document.querySelector("form"),
  inputText = document.querySelector(".text"),
  listItems = document.querySelector(".list");

class Todo {
  constructor() {
    this.arr = JSON.parse(localStorage.getItem("items")) || [];
    this.condations = "show";
  }

  add(id, todoVal) {
    this.arr.push({ idTodo: id, todoVal: todoVal });
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

  getItem(id) {
    this.condations = +id;
    let findd = this.arr.find((item) => {
      return item.idTodo === this.condations;
    });
    inputText.value = findd.todoVal;
  }

  editItem(val) {
    let itemEdit = { idTodo: this.condations, todoVal: val };
    let findd = this.arr.map((item) => {
      return item.idTodo === itemEdit.idTodo ? itemEdit : item;
    });
    localStorage.setItem("items", JSON.stringify(findd));
    this.arr = JSON.parse(localStorage.getItem("items"));
    this.condations = "show";
  }
}

let appTodo = new Todo();

appTodo.showItems();

Form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (appTodo.condations === "show") {
    let idRandoum = Math.floor(Math.random() * 100000);
    if (inputText.value.trim() !== "") {
      appTodo.add(idRandoum, inputText.value.trim());
    }
  } else {
    appTodo.editItem(inputText.value.trim());
  }
  appTodo.showItems();
  inputText.value = "";
});

document.addEventListener("click", (e) => {
  if (e.target.className === "delete") {
    appTodo.deleteItem(e.target.dataset.id);
    e.target.parentElement.parentElement.remove();
  } else if (e.target.className === "edit") {
    appTodo.getItem(e.target.dataset.edit);
  }
});
