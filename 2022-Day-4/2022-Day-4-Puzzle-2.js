/* 
 Day 4 Puzzle 2
 ! In how many assignment pairs does one range PARTIALLY contain the other? 
*/

const fs = require("fs")
const input = fs.readFileSync("input.txt", "utf-8")
let answer = 0
let array = []

const getInput = () => {
    input.split(/\r?\n/).forEach((line) => {
        array.push(line)
    })
    return array
}

const getAnswer = async () => {
    const input = getInput()
    // recursive case
    input.forEach((item) => {
        const terms = item.split(",")
        const left = terms[0].split("-").map((n) => parseInt(n))
        const right = terms[1].split("-").map((n) => parseInt(n))
        const leftStart = left[0]
        const leftEnd = left[1]
        const rightStart = right[0]
        const rightEnd = right[1]

        //compare ranges to find if one range partially contains the other
        if (rightStart >= leftStart && rightStart <= leftEnd) {
            answer++
        } else if (leftStart >= rightStart && leftStart <= rightEnd) {
            answer++
        }
    })
}

getAnswer().then(() => {
    console.log(answer)
})
