// call api
// timer generate word
// check word
// update score
// check max stack - game over

let arrStack = []
let maxStack = 10

async function generateWord() {
    let endpoint = "https://random-word-api.herokuapp.com/word"
    return await fetch(endpoint).then((response) => {
        return response.json()
    })
        .then((data) => {
            return data
        }).catch((ex) => {
            console.log("There's an error", ex)
        })
}

async function pushWord() {
    while (arrStack.length != maxStack) {
        let newWord = await generateWord()
        arrStack.push(...newWord)
    }
    console.log(arrStack)
}

async function start() {
    pushWord()
}

// remove when integrate with UI
start()

function checkWord(word) {
    console.log("Before check word: " + arrStack)
    arrStack = arrStack.filter(function (x) {
        return x != word
    })
    console.log("After check word: " + arrStack)
}

function inputSubmit(event) {
    let inputText = document.querySelector("input")
    console.log("Text :" + inputText.value)
    checkWord(inputText.value)
    inputText.value = ""
}

let form = document.querySelector("form")
form.addEventListener("submit", inputSubmit)



