// call api
// timer generate word
// check word
// update score
// check max stack - game over

let arrStack = []
let maxStack = 10
let timeInterval = 4
let score = 0
let boolNxtLevel = false

let scorePara = document.querySelector("span")

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
    AppendText(arrStack)
}

function nextLevel(score) {
    return ((score % 5) == 0)
}

function gameOver() {
    let ggElement = document.querySelector(".gameOver")
    ggElement.classList.remove("display-none");
    let scoreElement = document.querySelector(".gameOver h3 span")
    scoreElement.innerText = score
}

function initialize() {
    timeInterval = 4
    score = 0
    arrStack = []
    let startElement = document.querySelector('.start')
    startElement.classList.add('display-none')
    let ggElement = document.querySelector(".gameOver")
    if (!ggElement.classList.contains("display-none"))
        ggElement.classList.add("display-none");
}

async function start() {
    initialize()
    initialEvent()
    // setInterval(() => {
    //     if (score != 0 && nextLevel(score)) {
    //         timeInterval -= 0.5
    //         console.log('decrement interval: ' + timeInterval)
    //         boolNxtLevel = false
    //     }
    // }, 0.5)

    initialText(arrStack)

    while (arrStack.length != maxStack) {
        await wait(timeInterval * 1000).then(pushWord())
        console.log(arrStack)
    }
    gameOver();
}


function checkWord(word) {
    console.log("Before check word: " + arrStack)
    let wordIndex = arrStack.indexOf(word)
    console.log(wordIndex)
    if (wordIndex != -1) {
        score++
        scorePara.innerHTML = score


        // marquee.stop()
        arrStack.splice(wordIndex, 1)
        removeElement(word)
        //AppendText(arrStack)
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

function inputSubmit(input) {
    // let inputText = document.querySelector("input")
    // console.log("Text :" + inputText.value)
    // if (!inputText.value)
    //     return
    console.log("inputSubmit, " + input)
    checkWord(input)
    // inputText.value = ""

}

let input = ''
// let form = document.querySelector("form")
// form.addEventListener("submit", inputSubmit)
function initialEvent() {
    window.addEventListener("keyup", (event) => {
        let key = event.key
        console.log(key)
        if (key.length == 1)
            input += key
        if (key === "Enter") {
            inputSubmit(input)
            input = ''
        }
        if (key === "Escape")
            input = ''
        if (key === "Backspace")
            input = input.substring(0, input.length - 1)
        document.querySelector('h3').innerText = input
    })
}
marquee.setAttribute('scrollamount', 4)

function initialText(arr1) {
    let marquee = document.querySelector('.marquee_code')

    marquee.textContent = ''

    for (i = 0; i < maxStack; i++) {
        let div = document.createElement("div")
        div.innerHTML = `<marquee class='item${i}' style="text-align: center;" behavior="slide" scrollamount="60" direction="left"></marquee>`
        marquee.append(div)
    };
}

//let dir = ['test11111', 'test22222', 'test333333', '4', '5', '6', '7', '8', '9', '0']

let marquee = document.querySelector('.marquee_code')
//let divmain = document.querySelector('.divmain')
//let marquee_loaded = document.querySelector('.marquee_loaded')
//let btnSubmit = document.querySelector('.btnSubmit')
let txtsearch = document.querySelector('.txtsearch')

// dir.forEach((e,item) => {
//     let div = document.createElement("div")
//     div.id = item
//     div.textContent = e
//     marquee.appendChild(div)
// });
// marquee.setAttribute('scrollamount',6)
// marquee.start()

// marquee.addEventListener('click', (event)=>{
//     console.log(event.target+' : onclick')
// })

// btnSubmit.addEventListener('click', myload)
// function myload() {
//     // 
//     AppendText(txtsearch.value, 5)
//     console.log(txtsearch.value + 'button click')
// }

function AppendText(dir) {

    let marquee = document.querySelector('.marquee_code')

    marquee.textContent = ''
    let temp = [...dir]
    temp.reverse().forEach((e, item) => {
        console.log(`Item Index: ${item}; length: ${dir.length}`)
        let div = document.createElement("div")
        let html = ''
        if (item == 0) {
            html = `<marquee id='${e}' class='item${item}' style="text-align: center;" behavior="slide" scrollamount="60" direction="left">${e}</marquee>`

        } else {
            html = `<marquee id='${e}' class='item${item}' style="text-align: center;" behavior="slide" scrollamount="0" direction="left">${e}</marquee>`

        }
        div.innerHTML = html
        marquee.append(div)
    });

}

function removeElement(value) {
    let targetElement = document.querySelector(`#${value}`)
    targetElement.remove()
}

//CreateText(marquee, dir)



