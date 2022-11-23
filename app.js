// call api
// timer generate word
// check word
// update score
// check max stack - game over

let arrStack = []
let maxStack = 10
let timeInterval = 5

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

const wait = delay => new Promise(resolve => setTimeout(resolve, delay));

async function pushWord() {
        let newWord = await generateWord()
        arrStack.push(...newWord)
        console.log("Insert word")
}

function nextLevel(score){
    return (score % 5) == 0
}

async function start() {
    while (arrStack.length != maxStack) {
        if(nextLevel(score))
            timeInterval -= 0.05
        await wait(timeInterval*1000).then(pushWord())
        console.log(arrStack)
    }
    alert("game over")
}

// remove when integrate with UI
start()
console.log("Trigger after start")

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
    if(!inputText.value)
        return
    checkWord(inputText.value)
    inputText.value = ""
}

let form = document.querySelector("form")
form.addEventListener("submit", inputSubmit)



