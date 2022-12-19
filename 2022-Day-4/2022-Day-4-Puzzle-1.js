/* 
 Day 4 Puzzle 1
 ! In how many assignment pairs does one range fully contain the other? 
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

        //compare ranges to find if one range fully contains the other
        if (
            (left[0] <= right[0] && left[1] >= right[1]) ||
            (left[0] >= right[0] && left[1] <= right[1])
        ) {
            answer++
        }
    })
    return answer
}

getAnswer().then(() => {
    console.log(answer)
})
