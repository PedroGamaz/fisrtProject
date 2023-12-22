let modal = document.getElementById("modal")
let close = document.getElementById("close")
close.addEventListener("click", function(){
    modal.style.display = "none"
})
let btn = document.getElementById("btn")
btn.addEventListener("click", function(){
    modal.style.display = "flex"
})