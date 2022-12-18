//Description: 2022 Day 2 Puzzle 1 - Calculate winning score if I follow the strategy guide
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
        1 = rock
        2 = paper
        3 = scissors
        The score for a round is the score for the shape you selected 
        plus the score for the outcome of the round (0 if you lost, 
        3 if the round was a draw, and 6 if you won)
    */
    let score = me
    if (elf === me) {
        score = score + 3
    }
    if (
        (elf === 2 && me === 1) ||
        (elf === 1 && me === 3) ||
        (elf === 3 && me === 2)
    ) {
        score = score + 0
    }
    if (
        (elf === 1 && me === 2) ||
        (elf === 2 && me === 3) ||
        (elf === 3 && me === 1)
    ) {
        score = score + 6
    }
    return score
}

const convertScore = (letter) => {
    switch (letter) {
        case "A":
        case "X":
            return 1
        case "B":
        case "Y":
            return 2
        case "C":
        case "Z":
            return 3
    }
}

calculateScore().then((result) => {
    console.log(result)
})
