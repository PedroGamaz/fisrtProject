const url = "http://localhost:8080/task";
const button = document.getElementById("button");
const id = document.getElementById("id");
const content = document.getElementById("content");

// PUXANDO TODAS AS TASKS DO MEU BANCO DE DADOS
// fetch(url)
//   .then((res) => res.json())
//   .then(function (dataObject) {
//     console.log(dataObject);
//   });

const fetchId = async (taskid) => {
  const result = await fetch(`http://localhost:8080/task/${taskid}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return result;
};
// tipo como nao deu certo dps a gnt ve
const keys = ["title", "description", "observation"];

const buildResult = (res) => {
  let newObject = {};
  let newArray = [];
  newArray = keys
    .map((key) => document.getElementById(key))
    .filter((o) => o.checked)
    .map((o) => o.name);

  return newArray;

  // newObject = keys
  //   .map((key) => document.getElementById(key))
  //   .map((elem) => {
  //     elem.checked && (newObject[elem.name] = res[elem.name]);
  //   });
  // return newObject;
};

button.addEventListener("click", async (event) => {
  event.preventDefault();
  const res = await fetchId(id.value);
  console.log(res);
  console.log(buildResult(res));
  // content.textContent = `${JSON.stringify(res, undefined, 2)}`;
  // content.textContent = `${JSON.stringify(buildResult(res), undefined, 2)}`;
  // content.textContent = `${JSON.stringify(res, undefined, 2)}`;
  let columns = buildResult(res);
  console.log("Columns", columns);

  let table = document.getElementById("table");

  for (let item of res) {
    let newRow = document.createElement("tr");
    let cellid = document.createElement("td");
    cellid.textContent = item.id;
    newRow.appendChild(cellid);

    if (columns.includes("title")) {
      let cell1 = document.createElement("td");
      cell1.textContent = item.title;
      newRow.appendChild(cell1);
    }

    let cell2 = document.createElement("td");
    cell2.textContent = item.description;
    newRow.appendChild(cell2);

    let cell3 = document.createElement("td");
    cell3.textContent = item.observation;
    newRow.appendChild(cell3);

    table.appendChild(newRow);
  }

  console.log(buildResult(res));
});
