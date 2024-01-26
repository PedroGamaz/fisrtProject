// let modal = document.getElementById("modal")
// let close = document.getElementById("close")
// close.addEventListener("click", function(){
//     modal.style.display = "none"
// })
// let btn = document.getElementById("save")
// btn.addEventListener("click", function(){
//     modal.style.display = "flex"
// })
// let closeBtn = document.getElementById("buttonModal")
// closeBtn.addEventListener("click", function(){
//     modal.style.display = "none"
// })
// colocar interação no botão de save também ajeitar as interações dos botões até ir embora para começar com o modal fechado

const url = "http://localhost:8080/task";
const titleGet = document.getElementById("title");
const descriptionGet = document.getElementById("description");
const observationGet = document.getElementById("observation");
const form = document.getElementById("form");
let modalEdit = document.getElementById("modalEdit");

let grid = document.getElementById("grid");
// let button = document.getElementById("button");

// button.addEventListener("click", () => {
//   let newGridChild = document.createElement("div");
//   newGridChild.classList.add("gridChild");

//   grid.appendChild(newGridChild);
// });

// dialog
let modal = document.getElementById("modal");
modal.style.display = "none";

//botao fazer aparecer
let openModal = document.getElementById("openModal");
openModal.addEventListener("click", function () {
  modal.style.display = "flex";
});

//botao fechar
let close = document.getElementById("close");
close.addEventListener("click", function () {
  modal.style.display = "none";
});

//botao salvar fecha dialog e adiciona um gridChild por enquanto
let save = document.getElementById("save");
save.addEventListener("click", async function (e) {
  e.preventDefault();
  const title = titleGet.value;
  const description = descriptionGet.value;
  const observation = observationGet.value;
  const data = { title, description, observation };
  const body = JSON.stringify(data);

  let resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  //passar o codigo para o pedro.js e depois tentar resolver isso abaixo
  let newTask = await resp.json();
  console.log(newTask);

  let newGridChild = document.createElement("div");
  newGridChild.innerHTML = `
  <div class="gridChild contentContainer">
        <div class="contentChild">
            <label>${newTask.task.title}</label>
        </div>
        <div class="contentChild1">
            <label>${newTask.task.description}</label>
        </div>
        <div class="contentChild2">
        <label>${newTask.task.observation}</label>
        </div>
        </div>
        `;
  newGridChild.classList.add("gridChild");
  grid.appendChild(newGridChild);
  newGridChild.style.display = "block";
  modal.style.display = "none";
});

fetch(url)
  .then((res) => res.json())
  .then(function (dataObject) {
    console.log(dataObject);

    const grid = document.getElementById("grid");

    dataObject.forEach((task, index) => {
      // console.log(task);
      console.log(index);

      const gridChild = document.createElement("div");
      gridChild.innerHTML = `
      <div class="gridChild contentContainer" id="gridChild_${index + 1}">
        <div class="contentChild">
            <label>${task.title}</label>
        </div>
        <div class="contentChild1">
            <label>${task.description}</label>
        </div>
        <div class="contentChild2">
            <label>${task.observation}</label>
        </div>
      </div>
      `;
      gridChild.classList.add("gridChild");

      gridChild.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(task);
        console.log("Teste" + (index + 1));

        let inputTitle = document.getElementById("titleEdit");
        inputTitle.value = task.title;
        modalEdit.style.display = "flex";
      });

      grid.appendChild(gridChild);
    });
  });

//terminar as partes do CRUD editar e excluir
//após isso comear a ver o crud do usuário

//quando clicar ni gridChild (card)
//abrir tela de edição = dialog de cadastro com as informações
let gridChild = document.querySelector(".gridChild");
gridChild.addEventListener("click", function (e) {
  e.preventDefault();
  modalEdit.style.display = "flex";
});

let btnCloseEdit = document.getElementById("btnCloseEdit");
btnCloseEdit.addEventListener("click", function (e) {
  e.preventDefault();
  modalEdit.style.display = "none";
});

let btnEdit = document.getElementById("btnEdit");
btnEdit.addEventListener("click", function (e) {
  e.preventDefault();
  modalEdit.style.display = "none";
});
