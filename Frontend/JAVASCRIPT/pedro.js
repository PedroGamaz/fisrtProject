
const url = "http://localhost:8080/task";
const titleGet = document.getElementById("title");
const descriptionGet = document.getElementById("description");
const observationGet = document.getElementById("observation");
const form = document.getElementById("form");
let modalEdit = document.getElementById("modalEdit");

let grid = document.getElementById("grid");

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
// botao cancelar
let cancel = document.getElementById("cancel");
cancel.addEventListener("click", function () {
  modal.style.display = "none";
});

function getTaskValues(task){
  taskValues = task
  console.log(taskValues)
}

//botao salvar fecha dialog e adiciona um gridChild por enquanto
let save = document.getElementById("save");
save.addEventListener("click", async function (e) {
  e.preventDefault();
  const title = titleGet.value;
  const description = descriptionGet.value;
  const observation = observationGet.value;
  const data = { title, description, observation };
  const body = JSON.stringify(data);

  //fetch criação
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

  // adicionando um card na tela quando uma task é criada
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


// fetch get all tasks
fetch(url)
  .then((res) => res.json())
  .then(function (dataObject) {
    console.log(dataObject);

    const grid = document.getElementById("grid");

    // para cada task criar uma div (card)
    dataObject.forEach((task, index) => {
      // console.log(task);
      // console.log(index);
      // console.log(task.id);
      exports = {
        task
      }
      const gridChild = document.createElement("div");
      gridChild.innerHTML = `
      <div class="gridChild contentContainer" id="gridChild_${index + 1} data-id="${task.id}">
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


      // abrindo o modal e pegando os valores do input para printar na tela
      gridChild.addEventListener("click", async function (e) {
        e.preventDefault();
        // console.log(task);
        // console.log("Teste" + (index + 1));

        getTaskValues(task)
          
        let inputTitle = document.getElementById("titleEdit");
        inputTitle.value = task.title;

        let inputDescription = document.getElementById("descriptionEdit");
        inputDescription.value = task.description;

        let inputObservation = document.getElementById("observationEdit");
        inputObservation.value = task.observation;
        modalEdit.style.display = "flex";

        // pegando valores dos inputs do modalEdit
        // let titleEdit = document.getElementById("titleEdit");
        // let titleEditValue = titleEdit.value;
        // let descriptionEdit = document.getElementById("descriptionEdit");
        // let descriptionEditValue = descriptionEdit.value;
        // let observationEdit = document.getElementById("observationEdit");
        // let observationEditValue = observationEdit.value;

        // dar um fetch para receber os dados de um gridchild pq ta pegando os valores anteriores ao put

        // let resGetId = await fetch(`http://localhost:8080/task/${task.id}`)
        // let taskEdit = await resGetId.json();
        //   console.log(taskEdit);

        let id = task.id
        // pegar id e enviar para o put no back


          //atualizando os dados do card clicado
          
          // deletando task ver de limpar a variavel
          
        });

      grid.appendChild(gridChild);
    });
  });

async function editar(){
  getTaskValues(taskValues)

      let titleEdit = document.getElementById("titleEdit");
      let titleEditValue = titleEdit.value;
      let descriptionEdit = document.getElementById("descriptionEdit");
      let descriptionEditValue = descriptionEdit.value;
      let observationEdit = document.getElementById("observationEdit");
      let observationEditValue = observationEdit.value;

      
      const gridchildElement = document.getElementById("gridchild");

      let data = {
        id,
        titleEditValue,
        descriptionEditValue,
        observationEditValue,
      };
      const body = JSON.stringify(data);
      // console.log(bodyEdit);
      let resEdit = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body, 
      });
      // gridchildElement.style.display = "none";
      let taskEdit = await resEdit.json();
      
      
      //pegar valor dos inputs depois do PUT e colocar no gridchild para nao precisar dar um F5 
      modalEdit.style.display = "none";
      // jogar taskEdit para os valores do input quando abre o modal

      // adicionando um novo card quando o put termina 
      const gridChild = document.createElement("div");
      gridChild.innerHTML = `
      <div class="gridChild contentContainer" id="gridChild_${index + 1} data-id="${task.id}">
        <div class="contentChild">
            <label>${taskEdit[0].title}</label>
        </div>
        <div class="contentChild1">
            <label>${taskEdit[0].description}</label>
        </div>
        <div class="contentChild2">
            <label>${taskEdit[0].observation}</label>
        </div>
      </div>
      `;
      
      // analisar isso
      gridChild.classList.add("gridChild");
      titleEdit.value = taskEdit[0].title
      descriptionEdit.value = taskEdit[0].description
      observationEdit.value = taskEdit[0].observation

      // task = null  
      console.log(task);
}

let btnEdit = document.getElementById("btnEdit");
btnEdit.addEventListener("click", async function (e) {
  e.preventDefault();
})

function deletar(){
  getTaskValues(taskValues)
    // import {task} from dataObject
    let id = taskValues.id
    let data = {
      id,
    };
    const body = JSON.stringify(data);
    // console.log(body);
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: body, 
    });

    // delete [data]
    // console.log(data)
    btnDelete.style.display = "none";
    modalEdit.style.display = "none";
    gridChild.style.display = "none"; // dar um jeito de fazer sumir o gridchild (CARD) que foi excluido
  // pegar id da task aberta no dialog para mandar para o back 
  // DELETE task WHERE ${id} dar um jeito de puxar o id somente de cadas task quando div de gridchild e clicada

}
let btnDelete = document.getElementById("btnDelete");
btnDelete.addEventListener("click", function (e){
  e.preventDefault()
  // getTaskValues(task)
  deletar()
})
//terminar as partes do CRUD editar e excluir
//após isso comear a ver o crud do usuário

//quando clicar ni gridChild (card)
//abrir tela de edição = dialog de cadastro com as informações

// let gridChild = document.querySelector(".gridChild");
let btnCancelEdit = document.getElementById("btnCancelEdit");
btnCancelEdit.addEventListener("click", function (e) {
  e.preventDefault();
  if (isVisible = true){
    btnDelete.style.display = "none" 
    isVisible = false;
  }
  modalEdit.style.display = "none";
});

let btnCloseEdit = document.getElementById("btnCloseEdit");
btnCloseEdit.addEventListener("click", function (e) {
  e.preventDefault();
  if (isVisible = true){
    btnDelete.style.display = "none" 
    isVisible = false;
  }
  modalEdit.style.display = "none";
});


let iconDelete = document.getElementById("iconDelete");

let isVisible = false;

iconDelete.addEventListener("click", function (e) {
  e.preventDefault();
  if (isVisible) {
    btnDelete.style.display = "none";
    isVisible = false;
  } else {
    btnDelete.style.display = "block";
    console.log("clickIconDel")
    isVisible = true;
  }
});





