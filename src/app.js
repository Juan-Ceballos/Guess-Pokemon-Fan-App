import { pokemons } from "../data/pokemons.js"

const REVEAL_TIMEOUT = 3000
const INITIAL_LIVES = 2

class GameState {
    constructor() {
        this.count = 0
        this.score = 0
        this.lives = INITIAL_LIVES
    }

    incrementCount() {
        this.count += 1
    }

    incrementScore() {
        this.score += 1
    }

    decrementLives() {
        this.lives -= 1
    }

    isGameOver() {
        return this.lives < 0
    }

    reset() {
        this.count = 0
        this.score = 0
        this.lives = INITIAL_LIVES
    }
}

class DOMElements {
    constructor() {
        this.resultText = document.getElementById("result")
        this.lifeElements = document.getElementById("lives")
        this.playAgainButton = document.querySelector("button")
        this.scoreElement = document.querySelector(".score").firstElementChild
        this.pokeImage = document.getElementById("gameImage")
        this.guessForm = document.querySelector("form")
        this.inputField = this.guessForm?.firstElementChild
        
        this.initializeElements()
    }

    initializeElements() {
        if (this.resultText) this.resultText = true
        if (this.playAgainButton) this.playAgainButton.disabled = true
    }

    updateScore(score) {
        if (this.scoreElement) {
            this.scoreElement.innerText = String
        }
    }

    updateLives(currentLives) {
        if (this.lifeElements?.children) {
            this.lifeElements.children[currentLives].style.backgroundColor = 'gray'
        }
    }

    showResult(message) {
        if (this.resultText) {
            this.resultText.textContent = message
            this.resultText.hidden = false
        }
    }

    updatePokemonImage(imageUrl) {
        if (this.pokeImage) {
            this.pokeImage.src = imageUrl
        }
    }

    clearInput() {
        if (this.inputField) {
            this.inputField.value = ""
        }
    }
}

class PokemonGame {
    constructor(pokemons) {
        this.pokemons = pokemons 
        this.gameState = new GameState()
        this.domElements = new DOMElements()
        this.initializeGame()
    }

    initializeGame() {
        this.addGuessEventListener() 
    }

    checkGuess(guess) {
        const currentPokemon = this.pokemons[this.gameState.count]
        if (!currentPokemon) return false
        return currentPokemon.name === guess
    }

    handleCorrectGuess() {
        this.gameState.incrementScore()
        this.domElements.showResult("Correct!")
        this.domElements.updateScore(this.gameState.score)
    }

    handleIncorrectGuess() {
        this.domElements.updateLives(this.gameState.lives)
        this.gameState.decrementLives()

        if (this.gameState.isGameOver()) {
            this.domElements.showResult("Game Over!")
            return true
        }

        this.DOMElements.showResult("Wrong!")
        return false
    }

    updatePokemonDisplay() {
        const currentPokemon = this.pokemon[this.gameState.count]
        if (!currentPokemon) return

        this.domElements.updatePokemonImage(currentPokemon.img)
        this.gameState.incrementCount

        setTimeout(() => {
            const nextPokemon = this.pokemons[this.gameState.count]
            if (nextPokemon) {
                this.domElements.updatePokemonImage(nextPokemon.imgHidden)
            }
        }, REVEAL_TIMEOUT)
    }

    addGuessEventListener() {
        const handleGuess = (event) => {
            if (event.key !== "Enter") return

            event.preventDefault()
            const guess = this.domElements.inputField.value

            if (this.checkGuess(guess)) {
                this.handleCorrectGuess
            } else {
                const isGameOver = this.handleIncorrectGuess()
                if (isGameOver) return
            }

            this.updatePokemonDisplay()
            this.domElements.clearInput()
        }

        if (this.domElements.inputField) {
            this.domElements.inputField.addEventListener("keydown", handleGuess)
        }
        
    }
}

const game = new PokemonGame(pokemons)



// console.log("hello")
// let h1 = document.querySelector("h1")
// console.log(h1.innerText)

// let gameSpace = document.getElementById("result")
// console.log(gameSpace.innerText)

// let guessForm = document.querySelector("form")
// let input = guessForm.firstElementChild

// console.log(guessForm)
// console.log(input)



// let count = 0
// let score = 0
// let gameLives = 2
// let resultText = document.getElementById("result")
// resultText.hidden = true
// let lifeElements = document.getElementById("lives")
// let playAgainButton = document.querySelector("button")
// playAgainButton.disabled = true
// let scoreElement = document.querySelector(".score").firstElementChild
// console.log(scoreElement)


// function addFormEventListener() {
//     let guessForm = document.querySelector("form")
//     let inputField = guessForm.firstElementChild
//     let pokeImage = document.getElementById("gameImage")
//     inputField.addEventListener("keydown", function(event) {
//         if (event.key === "Enter") {
//             event.preventDefault()
//             let enteredText = inputField.value
//             if (pokemons[count].name === enteredText) {
//                 // change image  
//                 score += 1
//                 console.log("guess right")
//                 resultText.textContent = "Correct!"
//                 resultText.hidden = false
//                 scoreElement.innerText = String(score)
//             } else {
//                 if (gameLives === 0) {
//                     lifeElements.children[gameLives].style.backgroundColor = 'gray'
//                     console.log("game over")
//                     resultText.textContent = "Game Over!"
//                     resultText.hidden = false
//                     return
//                 } else {
//                     console.log("guess wrong")
//                     resultText.textContent = "Wrong!"
//                     resultText.hidden = false
//                     lifeElements.children[gameLives].style.backgroundColor = 'gray'
//                     gameLives -= 1   
//                 }      
//             }
//             pokeImage.src = pokemons[count].img
//             if (count == pokemons.length - 1) {
//                 resultText.textContent = "Game Over!"
//                 return
//             }
//             count += 1
            
//             setTimeout(() => {
//                 pokeImage.src = pokemons[count].imgHidden
//             }, 3000)
//             inputField.value = ""
//         }
//     })
// }



//addFormEventListener()