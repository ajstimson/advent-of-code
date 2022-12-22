/* 
 * Day 5 Puzzle 2
 ! return the letter that will be on top of the stacks 
 ! after following the move instructions
*/

const fs = require("fs")
const readline = require("readline")
const input = "input.txt"
const stacks = []
const movementArray = []

class Stack {
    constructor() {
        this.data = []
    }
    push(record) {
        this.data.unshift(record)
    }
    pop() {
        return this.data.shift()
    }
}

const parseData = async () => {
    const fileStream = fs.createReadStream(input)
    const rl = readline.createInterface({
        input: fileStream,
    })
    let stackStr = ""
    let stackNumbers = false
    for await (const line of rl) {
        if (line.match(/^(\s\d)/g)) {
            stackNumbers = true
        }
        if (!stackNumbers) {
            stackStr += line + "\r"
        }
        if (line.match(/^move/g)) {
            movementArray.push(line.match(/(\d+)/g))
        }
    }
    setStacks(stackStr)
}

const setStacks = (str) => {
    let index = 0
    str.split("").map((char) => {
        // if string is carriage return reset index
        if (char === "\r") {
            index = 0
        } else {
            index++
        }
        if (char.match(/[A-Z]/g)) {
            let position = Math.floor(index / 4)

            if (stacks[position]) {
                stacks[position].push(char)
            } else {
                stacks[position] = [char]
            }
        }
    })
    moveStacks()
}

const moveStacks = () => {
    movementArray.map((move) => {
        let numberOfBlocks = move[0]
        let origin = move[1] - 1
        let destination = move[2] - 1
        for (let i = 0; i < numberOfBlocks; i++) {
            const block = stacks[origin].shift()
            stacks[destination].unshift(block)
        }
    })
}

parseData().then(() => {
    console.log(stacks.map((x) => x[0]).join(""))
})
