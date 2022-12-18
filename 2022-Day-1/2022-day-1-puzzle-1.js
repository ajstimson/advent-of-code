// Description: Find the elf carrying the most calories
const fs = require("fs")
const readline = require("readline")
const file = "./2022-day-1-input.txt"

async function findCalories() {
    const fileStream = fs.createReadStream(file)
    const rl = readline.createInterface({
        input: fileStream,
    })

    let sum = 0
    let mostCalories = 0
    for await (const line of rl) {
        if (line.match(/^\s*$/g)) {
            mostCalories = Math.max(sum, mostCalories)
            sum = 0
        } else {
            sum = sum + parseInt(line)
        }
    }
    console.log(mostCalories)
    return mostCalories
}

findCalories()
