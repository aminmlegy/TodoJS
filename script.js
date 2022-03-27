let Form = document.querySelector("form"),
  inputText = document.querySelector(".text"),
  listItems = document.querySelector(".list");

// class Todo {
//   constructor() {
//     this.arr = JSON.parse(localStorage.getItem("items")) || [];
//     this.condations = "show";
//   }

//   add(todoVal) {
//     let idRandoum = Date.now();
//     this.arr.push({ idTodo: idRandoum, todoVal: todoVal });
//     localStorage.setItem("items", JSON.stringify(this.arr));
//     this.showItems();
//   }

//   showItems() {
//     listItems.innerHTML = "";
//     this.arr.forEach((element) => {
//       listItems.innerHTML += `
//         <div class="item">
//         <div class="text">
//             ${element.todoVal}
//         </div>
//         <div class="option">
//             <span class="delete" data-id="${element.idTodo}">&cross;</span>
//             <span class="edit" data-edit="${element.idTodo}">&orarr;</span>
//         </div>
//       </div>
//         `;
//     });
//   }

//   deleteItem(id) {
//     this.arr = this.arr.filter((item) => {
//       return item.idTodo !== +id;
//     });
//     localStorage.setItem("items", JSON.stringify(this.arr));
//   }

//   getItem(id) {
//     this.condations = +id;
//     let findd = this.arr.find((item) => {
//       return item.idTodo === this.condations;
//     });
//     inputText.value = findd.todoVal;
//   }

//   editItem(val) {
//     let itemEdit = { idTodo: this.condations, todoVal: val };
//     this.arr = this.arr.map((item) => {
//       return item.idTodo === itemEdit.idTodo ? itemEdit : item;
//     });
//     localStorage.setItem("items", JSON.stringify(this.arr));
//     this.condations = "show";
//     this.showItems();
//   }
// }

// let appTodo = new Todo();

// appTodo.showItems();

// Form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (appTodo.condations === "show") {
//     if (inputText.value.trim() !== "") {
//       appTodo.add(inputText.value.trim());
//     }
//   } else {
//     appTodo.editItem(inputText.value.trim());
//   }
//   inputText.value = "";
// });

// document.addEventListener("click", (e) => {
//   if (e.target.className === "delete") {
//     appTodo.deleteItem(e.target.dataset.id);
//     e.target.parentElement.parentElement.remove();
//   } else if (e.target.className === "edit") {
//     appTodo.getItem(e.target.dataset.edit);
//   }
// });

const Wrap = (function () {
  let arr = JSON.parse(localStorage.getItem("items")) || [];
  let condations = "show";
  showItems();

  function add(id, todoVal) {
    arr.push({ idTodo: id, todoVal: todoVal });
    localStorage.setItem("items", JSON.stringify(arr));
    showItems();
  }

  function showItems() {
    listItems.innerHTML = "";
    arr.forEach((element) => {
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

  function deleteItem(id) {
    arr = arr.filter((item) => {
      return item.idTodo !== +id;
    });
    localStorage.setItem("items", JSON.stringify(arr));
  }

  function getItem(id) {
    condations = id;
    let findd = arr.find((item) => {
      return item.idTodo === condations;
    });
    inputText.value = findd.todoVal;
  }

  function editItem(val) {
    let itemEdit = { idTodo: condations, todoVal: val };
    arr = arr.map((item) => {
      return item.idTodo == itemEdit.idTodo ? itemEdit : item;
    });
    console.log(arr);
    localStorage.setItem("items", JSON.stringify(arr));
    condations = "show";
    showItems();
  }
  function usedd() {
    if (condations === "show") {
      let idRandoum = Math.floor(Math.random() * 100000);

      if (inputText.value.trim() !== "") {
        add(idRandoum, inputText.value.trim());
      }
    } else {
      editItem(inputText.value.trim());
    }
  }
  return {
    deleteItem,
    getItem,
    usedd,
  };
})();

Form.addEventListener("submit", (e) => {
  e.preventDefault();
  Wrap.usedd();
  inputText.value = "";
});

document.addEventListener("click", (e) => {
  if (e.target.className === "delete") {
    Wrap.deleteItem(e.target.dataset.id);

    e.target.parentElement.parentElement.remove();
  } else if (e.target.className === "edit") {
    const editId = +e.target.dataset.edit;
    Wrap.getItem(editId);
  }
});
