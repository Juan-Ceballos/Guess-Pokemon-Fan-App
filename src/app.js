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
            let currPokemon = pokemons[count]
            if (currPokemon.name === enteredText) {
                // change image
                pokeImage.src = currPokemon.img
                count += 1
                score += 1
                console.log("guess right")
            } else {
                // lose a game life
                // still reveal pokemon
                console.log("guess wrong")    
            }
        }
    })
}

// function comparePokemon(name) {

// }

addFormEventListener()