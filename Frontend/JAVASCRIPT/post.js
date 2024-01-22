const url = "http://localhost:8080/task";
const titleGet = document.getElementById("title");
const descriptionGet = document.getElementById("description");
const observationGet = document.getElementById("observation");
const form = document.getElementById("form");

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//     const title = titleGet.value
//     const description = descriptionGet.value
//     const observation = observationGet.value
//   console.log(title, description, observation);

//   const data = { title, description, observation }
//   const body = JSON.stringify(data)
//   console.log(body)
//   fetch("http://localhost:8080/task", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: body,
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err)); 
// });

let grid = document.getElementById('grid')
let button = document.getElementById('button')

button.addEventListener("click", () => {
  let newGridChild = document.createElement("div");
  newGridChild.classList.add("gridChild");

  grid.appendChild(newGridChild);
})

// dialog
let modal = document.getElementById("modal")
modal.style.display = "none";

//botao fazer aparecer
let openModal = document.getElementById("openModal")
openModal.addEventListener("click", function (){
  modal.style.display = "flex"
})

//botao fechar
let close = document.getElementById("close")
close.addEventListener("click", function(){
  modal.style.display = "none"
})

//botao salvar fecha dialog e adiciona um gridChild por enquanto
let save = document.getElementById("save")
save.addEventListener("click", function (e){
  e.preventDefault();
    const title = titleGet.value
    const description = descriptionGet.value
    const observation = observationGet.value
  console.log(title, description, observation);

  const data = { title, description, observation }
  const body = JSON.stringify(data)

  fetch("http://localhost:8080/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err)); 
  let newGridChild = document.createElement("div");
  newGridChild.classList.add("gridChild");

  grid.appendChild(newGridChild);
  modal.style.display = "none"
})

// FAZER AMANHA FAZER A FETCH DAR UM GET E APARECER OS VALORES QUE PEGA
//DO BANCO NO LABEL TIPO A TABELA QUE HENRIQUE FEZ
fetch(url)
  .then((res) => res.json())
  .then(function (dataObject) {
    console.log(dataObject);


    // for (let task of dataObject){
    //   let title = task.title
    //   let description = task.description
    //   let observation = task.observation

    //   const labelTitle = document.createElement('labelTitle')
    //   labelTitle.textContent = title;

    //   const labelDescription = document.createElement('labelDescrption')
    //   labelDescription.textContent = description;

    //   const labelObservation = document.createElement('labelObservation')
    //   labelObservation.textContent = observation;

    //   // labelTitle.appendChild(title)
    //   // labelDescription.appendChild(description)
    //   // labelObservation.appendChild(observation)
    //   const taskElement = document.createElement(".gridChild");
    //   taskElement.appendChild(labelTitle); // Adicione o labelTitle ao elemento da tarefa
    //   taskElement.appendChild(labelDescription); // Adicione o labelDescription ao elemento da tarefa
    //   taskElement.appendChild(labelObservation); // Adicione o labelObservation ao elemento da tarefa

    //   document.querySelector(".gridChild").appendChild(taskElement);
    // }

 
    //for (foreach(task) of dataObject)
    const gridChildTemplate = `
      <div class="gridChild">
        <label>${title}</label>
        <label>${description}</label>
        <label>${observation}</label>
      </div>
    `;

  const grid = document.getElementById("grid");

  dataObject.forEach((task) => {
    console.log(task)
    const gridChild = document.createElement("div");
    gridChild.innerHTML = gridChildTemplate;
    gridChild.classList.add("gridChild");

    grid.appendChild(gridChild);
  });
});


