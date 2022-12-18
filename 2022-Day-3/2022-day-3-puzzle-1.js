/*
* Description: 2022 Day 3
! Puzzle 1
? Find duplicate letter (case sensistive) when dividing strings in half
? convert letter to number (proirity) and add them together
* Lowercase item types a through z have priorities 1 through 26.
* Uppercase item types A through Z have priorities 27 through 52.
? Find the sum of the priorities of all items in the list
*/

const url = "https://adventofcode.com/2022/day/3/input"

const fetchInput = async () => {
    const response = await fetch(url, {
        headers: {
            cookie: "session=53616c7465645f5f55b39e12ffe446f116f491e985152deab6dcdc5a3de19efc47484940f82911a91cc349209f79ee53a40392750550ece2e1f29ee9f5f4799b",
        },
    })
    const data = await response.text()
    return data
}

const getPrioritySum = async () => {
    const data = await fetchInput()
    const input = data
    let sum = 0

    input.split("\n").forEach((x) => {
        if (x.length > 0) {
            const firstHalf = x.slice(0, x.length / 2)
            const secondHalf = x.slice(x.length / 2)
            // filter out the duplicate letter
            const duplicate =
                x &&
                firstHalf.split("").filter((letter) => {
                    if (secondHalf.includes(letter)) {
                        return letter
                    }
                })
            const proirity = calculatePriority(duplicate[0])
            sum = sum + proirity
        }
    })
    return sum
}

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

getPrioritySum().then((result) => {
    console.log(result)
})
