console.log("hello")
const h1 = document.querySelector("h1")
console.log(h1.innerText)

const gameSpace = document.getElementById("result")
console.log(gameSpace.innerText)

let guessForm = document.querySelector("form")
let input = guessForm.firstElementChild

console.log(guessForm)
console.log(input)




function addFormEventListener() {
    let guessForm = document.querySelector("form")
    let inputField = guessForm.firstElementChild
    inputField.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault()
            let enteredText = inputField.value
            console.log(enteredText)
        }
    })
}

addFormEventListener()