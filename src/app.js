import { pokemons } from "../data/pokemons.js"

const REVEAL_TIMEOUT = 3000, INITIAL_LIVES = 2, INITIAL_COUNT = 0, INITIAL_SCORE = 0, COUNT_INCREMENT = 1, SCORE_INCREMENT = 1, LIFE_DECREMENT = 1, GAME_OVER_LIVES = 0, GAME_OVER_COUNT = 9
const SELECTOR_LIVES = "lives", SELECTOR_GAME_IMAGE = "gameImage", SELECTOR_FORM = "form", SELECTOR_SCORE = ".score", SELECTOR_RESULT = "result", SELECTOR_PLAY_AGAIN = "button"
const CORRECT_MESSAGE = "Correct!", WRONG_MESSAGE = "Wrong!", GAME_OVER_MESSAGE = "Game Over!", EMPTY_STRING = "", ENTER_KEY = "Enter", SCORE_PREFIX = 'Score: ', LIFE_COLOR = "blue", LIFE_LOST_COLOR = "gray", KEY_DOWN_EVENT = "keydown", CLICK_EVENT = "click"

class GameState {
    constructor() {
        this.count = INITIAL_COUNT
        this.score = INITIAL_SCORE
        this.lives = INITIAL_LIVES
    }

    incrementCount() {
        this.count += COUNT_INCREMENT
    }

    incrementScore() {
        this.score += SCORE_INCREMENT
    }

    decrementLives() {
        this.lives -= LIFE_DECREMENT
    }

    isGameOver() {
        return this.lives < GAME_OVER_LIVES || this.count == GAME_OVER_COUNT
    }

    reset() {
        this.count = INITIAL_COUNT
        this.score = INITIAL_SCORE
        this.lives = INITIAL_LIVES
    }
}

class DOMElements {
    constructor() {
        this.resultText = document.getElementById(SELECTOR_RESULT)
        this.lifeElements = document.getElementById(SELECTOR_LIVES)
        this.scoreElement = document.querySelector(SELECTOR_SCORE).firstElementChild
        this.pokeImage = document.getElementById(SELECTOR_GAME_IMAGE)
        this.guessForm = document.querySelector(SELECTOR_FORM)
        this.inputField = this.guessForm?.firstElementChild
        this.playAgainButton = document.querySelector(SELECTOR_PLAY_AGAIN)
        
        this.initializeElements()
    }

    initializeElements() {
        if (this.resultText) this.resultText.hidden = true
    }

    updateScore(score) {
        if (this.scoreElement) {
            this.scoreElement.innerText = `${SCORE_PREFIX}${String(score)}`
        }
    }

    updateLives(currentLives) {
        if (this.lifeElements?.children) {
            this.lifeElements.children[currentLives].style.backgroundColor = LIFE_LOST_COLOR
        }
    }

    resetLives() {
        if (this.lifeElements?.children) {
            for (let lifeElement of this.lifeElements.children) {
                lifeElement.style.backgroundColor = LIFE_COLOR
            }
        }
    }

    showResult(message) {
        if (this.resultText) {
            this.resultText.textContent = message
            this.resultText.hidden = false
        }
    }

    hideResult() {
        if (this.resultText) {
            this.resultText.hidden = true
        }
    }

    updatePokemonImage(imageUrl) {
        if (this.pokeImage) {
            this.pokeImage.src = imageUrl
        }
    }

    clearInput() {
        if (this.inputField) {
            this.inputField.value = EMPTY_STRING
        }
    }

    disableInput() {
        if (this.inputField) {
            this.inputField.disabled = true
        }
    }

    enableInput() {
        if (this.inputField) {
            this.inputField.disabled = false
        }
    }

    resetElements(score, imageUrl) {
        this.enableInput()
        this.clearInput()
        this.hideResult()
        this.updateScore(String(score))
        this.updatePokemonImage(imageUrl)
        this.resetLives()
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
        this.addPlayAgainButtonEventListener()
    }

    checkGuess(guess) {
        const currentPokemon = this.pokemons[this.gameState.count]
        if (!currentPokemon) return false
        return currentPokemon.name === guess.toLowerCase()
    }

    handleGameOver() {
        if (this.gameState.isGameOver()) {
            this.domElements.showResult(GAME_OVER_MESSAGE)
            this.domElements.disableInput()
            return true
        }

        return false
    }

    handleCorrectGuess() {
        this.gameState.incrementScore()
        this.domElements.showResult(CORRECT_MESSAGE)
        this.domElements.updateScore(this.gameState.score)

        return this.handleGameOver()
    }

    handleIncorrectGuess() {
        this.domElements.updateLives(this.gameState.lives)
        this.gameState.decrementLives()

        if (this.handleGameOver()) {
            return true
        }

        this.domElements.showResult(WRONG_MESSAGE)
        return false
    }

    updatePokemonDisplay() {
        const currentPokemon = this.pokemons[this.gameState.count]
        if (!currentPokemon) return

        this.domElements.updatePokemonImage(currentPokemon.img)
        this.domElements.disableInput()

        if (this.gameState.count === GAME_OVER_COUNT) {
            return
        }

        this.gameState.incrementCount()

        setTimeout(() => {
            const nextPokemon = this.pokemons[this.gameState.count]
            if (nextPokemon) {
                this.domElements.updatePokemonImage(nextPokemon.imgHidden)
            }
            this.domElements.enableInput()
        }, REVEAL_TIMEOUT)
    }

    resetGame() {
        this.gameState.reset()
        const resetCount = this.gameState.count
        const resetScore = this.gameState.score
        const resetPokemon = pokemons[resetCount]
        if (!resetPokemon) {return}
        this.domElements.resetElements(resetScore, resetPokemon.imgHidden)
    }

    addGuessEventListener() {
        const handleGuess = (event) => {
            if (event.key !== ENTER_KEY) return

            event.preventDefault()
            const guess = this.domElements.inputField.value

            if (this.checkGuess(guess)) {
                const isGameOver = this.handleCorrectGuess()
                if (isGameOver) return
            } else {
                const isGameOver = this.handleIncorrectGuess()
                if (isGameOver) return
            }

            this.updatePokemonDisplay()
            this.domElements.clearInput()
        }

        if (this.domElements.inputField) {
            this.domElements.inputField.addEventListener(KEY_DOWN_EVENT, handleGuess)
        }
        
    }

    addPlayAgainButtonEventListener() {
        this.domElements.playAgainButton.addEventListener(CLICK_EVENT, (event) => {
            event.preventDefault()
            this.resetGame()
        })
    }
}

const game = new PokemonGame(pokemons)