/*
* Description: 2022 Day 3
! Puzzle 2 - FAILED!!!
? return the duplicate letter that occurs in each three lines
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
    const input = data.split("\n").reverse()
    console.log(input.length)
    let sum = 0
    let items = []
    input.forEach((x) => {
        if (x.length === 0) return
        if (items.length === 3) {
            //sort the items by length then find duplicates
            const duplicate = findDupes(
                items.sort((a, b) => {
                    return b.length - a.length
                })
            )
            const priority = calculatePriority(duplicate)
            sum = sum + priority
            items.length = 0
            items.push(x)
        } else {
            items.push(x)
        }
    })
    return sum
}

const findDupes = (items) => {
    //comparator is always the first (longest) string
    const comparator = items[0].split("")

    let i = comparator.length
    let dupe = ""

    //
    while (i--) {
        if (
            items[1].includes(comparator[i]) &&
            items[2].includes(comparator[i])
        ) {
            dupe = comparator[i]
            break
        }
    }

    return dupe
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
