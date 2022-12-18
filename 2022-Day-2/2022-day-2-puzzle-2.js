/*
* Description: 2022 Day 2 
! Puzzle 2 
? Calculate winning score if I follow the strategy guide
* X, Y, Z now tells me whether to win lose or draw
* A, B, C tells me what shape the elf will play
* Now I need to figure out what shape I should play
* and return the resulting score
*/
//First fetch the input from the website

//fetch
// const fetch = require("node-fetch")
const url = "https://adventofcode.com/2022/day/2/input"

const fetchInput = async () => {
    const response = await fetch(url, {
        headers: {
            cookie: "session=53616c7465645f5f55b39e12ffe446f116f491e985152deab6dcdc5a3de19efc47484940f82911a91cc349209f79ee53a40392750550ece2e1f29ee9f5f4799b",
        },
    })
    const data = await response.text()
    return data
}

const calculateScore = async () => {
    const data = await fetchInput()
    const input = data
    let sum = 0

    input.split("\n").forEach((x) => {
        const score = x && evaluateScore(convertScore(x[0]), convertScore(x[2]))
        sum = sum + score
    })
    return sum
}

const evaluateScore = (elf, me) => {
    /*  
        rock = 1
        paper = 2
        scissors = 3
    */
    //If I draw, then I get 3 points + the elf's score
    if (me === "draw") return elf + 3
    if (me === "lose") {
        /*return the value of the losing shape
            elf = 1(rock) then return 3(scissors)
            elf = 2(paper) then return 1(rock)
            elf = 3(scissors) then return 2(paper)
        */

        if (elf === 1) return 3
        if (elf === 2) return 1
        if (elf === 3) return 2
    }
    if (me === "win") {
        /*return the value of the winning shape + 6
            elf = 1(rock) then return 2(paper)
            elf = 2(paper) then return 3(scissors)
            elf = 3(scissors) then return 1(rock)
        */
        if (elf === 1) return 2 + 6
        if (elf === 2) return 3 + 6
        if (elf === 3) return 1 + 6
    }
}

const convertScore = (letter) => {
    switch (letter) {
        case "A":
            return 1
        case "B":
            return 2
        case "C":
            return 3
        case "X":
            return "lose"
        case "Y":
            return "draw"
        case "Z":
            return "win"
    }
}

calculateScore().then((result) => {
    console.log(result)
})
