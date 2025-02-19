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
let gameLives = 2
let resultText = document.getElementById("result")
resultText.hidden = true
let lifeElements = document.getElementById("lives")
let playAgainButton = document.querySelector("button")
playAgainButton.disabled = true


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
                score += 1
                console.log("guess right")
                resultText.textContent = "Correct!"
                resultText.hidden = false
            } else {
                if (gameLives === 0) {
                    lifeElements.children[gameLives].style.backgroundColor = 'gray'
                    console.log("game over")
                    resultText.textContent = "Game Over!"
                    resultText.hidden = false
                    return
                } else {
                    console.log("guess wrong")
                    resultText.textContent = "Wrong!"
                    resultText.hidden = false
                    lifeElements.children[gameLives].style.backgroundColor = 'gray'
                    gameLives -= 1   
                }      
            }
            pokeImage.src = pokemons[count].img
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