// call api
// timer generate word
// check word
// update score
// check max stack - game over

let arrStack = []
let maxStack = 10
let timeInterval = 5
let score = 0
let boolNxtLevel = false

let scorePara = document.querySelector("p")

async function generateWord() {
    let endpoint = "https://random-words-api.herokuapp.com/w?n=1"
    return await fetch(endpoint).then((response) => {
        return response.json()
    })
        .then((data) => {
            return data
        }).catch((ex) => {
            console.log("There's an error", ex)
        })
}

const wait = delay => new Promise(resolve => setTimeout(resolve, delay));

async function pushWord() {
    console.log("Insert word")
    let newWord = await generateWord()
    arrStack.push(...newWord)
}

function nextLevel(score) {
    return ((score % 5) == 0)
}

async function start() {
    // setInterval(() => {
    //     if (score != 0 && nextLevel(score)) {
    //         timeInterval -= 0.5
    //         console.log('decrement interval: ' + timeInterval)
    //         boolNxtLevel = false
    //     }
    // }, 0.5)
    while (arrStack.length != maxStack) {
        await wait(timeInterval * 1000).then(pushWord())
        console.log(arrStack)
    }
    alert("game over")
}

// remove when integrate with UI
start()
console.log("Trigger after start")

function checkWord(word) {
    console.log("Before check word: " + arrStack)
    let wordIndex = arrStack.indexOf(word)
    console.log(wordIndex)
    if (wordIndex != -1) {
        score++
        scorePara.innerHTML = score
        arrStack.splice(wordIndex, 1)
        // arrStack = arrStack.filter(function (x) {
        //     return x != word
        // })
        if (score != 0 && nextLevel(score)) {
            timeInterval -= 0.5
            console.log('decrement interval: ' + timeInterval)
        }
    }
    console.log("After check word: " + arrStack)
}

function inputSubmit(event) {
    let inputText = document.querySelector("input")
    console.log("Text :" + inputText.value)
    if (!inputText.value)
        return
    checkWord(inputText.value)
    inputText.value = ""

}

let form = document.querySelector("form")
form.addEventListener("submit", inputSubmit)



