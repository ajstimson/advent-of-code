/*
* Description: 2022 Day 3
! Puzzle 2 - 2nd attempt, SUCCESS!!!
? return the duplicate letter that occurs in each three lines
? convert letter to number (proirity) and add them together
* Lowercase item types a through z have priorities 1 through 26.
* Uppercase item types A through Z have priorities 27 through 52.
? Find the sum of the priorities of all items in the list
*/

const fs = require("fs")
const input = fs.readFileSync("input.txt", "utf-8")
let answer = 0
let array = []

const calculatePriority = (letter) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (alphabet.includes(letter)) {
        return alphabet.indexOf(letter) + 1
    }
    if (upperAlphabet.includes(letter)) {
        return upperAlphabet.indexOf(letter) + 27
    }
    return 0
}

const getInput = () => {
    // needed input to be converted from raw text to an array
    input.split(/\r?\n/).forEach((line) => {
        array.push(line)
    })
    return array
}

const getPrioritySum = async () => {
    const items = getInput()
    for (i = 0; i < items.length; i += 3) {
        let comparator = items[i]
        let j = comparator.length
        while (j--) {
            if (
                items[i + 1].includes(comparator[j]) &&
                items[i + 2].includes(comparator[j])
            ) {
                answer += calculatePriority(comparator[j])
                break
            }
        }
    }
}

getPrioritySum().then(() => {
    console.log(answer)
})
