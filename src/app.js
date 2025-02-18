import { pokemons } from "../data/pokemons.js"

console.log("hello")
let h1 = document.querySelector("h1")
console.log(h1.innerText)

let gameSpace = document.getElementById("result")
console.log(gameSpace.innerText)

let guessForm = document.querySelector("form")
let input = guessForm.firstElementChild

console.log(guessForm)
console.log(input)



let count = 0
let score = 0

function addFormEventListener() {
    let guessForm = document.querySelector("form")
    let inputField = guessForm.firstElementChild
    let pokeImage = document.getElementById("gameImage")
    inputField.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault()
            let enteredText = inputField.value
            if (pokemons[count].name === enteredText) {
                // change image
                pokeImage.src = pokemons[count].img
                score += 1
                console.log("guess right")
            } else {
                // lose a game life
                // still reveal pokemon
                console.log("guess wrong")    
            }
            count += 1
            setTimeout(() => {
                pokeImage.src = pokemons[count].imgHidden
            }, 3000)
        }
    })
}

// function comparePokemon(name) {

// }

addFormEventListener()