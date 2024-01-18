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
  console.log(body)
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


fetch(url)
  .then((res) => res.json())
  .then(function (dataObject) {
    console.log(dataObject);
  });