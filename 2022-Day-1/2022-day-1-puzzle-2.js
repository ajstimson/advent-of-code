//  Find the three elves with the most calories and provide the sum
const fs = require("fs")
const readline = require("readline")
const file = "./2022-day-1-input.txt"

const compareTopThree = (array, calories) => {}
async function findCalories() {
    const fileStream = fs.createReadStream(file)
    const rl = readline.createInterface({
        input: fileStream,
    })
    let calorieArray = []
    let sum = 0
    for await (const line of rl) {
        if (line.match(/^\s*$/g)) {
            //allow three items in the array, then compare the sum to the lowest value
            if (calorieArray.length < 3) {
                calorieArray.push(sum)
            } else {
                //find the lowest value in the array
                let min = Math.min(...calorieArray)
                if (sum > min) {
                    calorieArray.splice(calorieArray.indexOf(min), 1, sum)
                }
            }
            sum = 0
        } else {
            sum = sum + parseInt(line)
        }
    }
    //add up the three highest values
    let total = calorieArray.reduce((a, b) => a + b, 0)
    console.log(total)
    return total
}

findCalories()
