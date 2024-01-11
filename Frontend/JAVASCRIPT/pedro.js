let modal = document.getElementById("modal")
let close = document.getElementById("close")
close.addEventListener("click", function(){
    modal.style.display = "none"
})
let btn = document.getElementById("btn")
btn.addEventListener("click", function(){
    modal.style.display = "flex"
})
let closeBtn = document.getElementById("buttonModal")
closeBtn.addEventListener("click", function(){
    modal.style.display = "none"
})
// colocar interação no botão de save também ajeitar as interações dos botões até ir embora para começar com o modal fechado