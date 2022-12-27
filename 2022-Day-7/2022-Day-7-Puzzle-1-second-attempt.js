const readline = require("readline")
const example = "example.txt"
const input = "input.txt"
const util = require("node:util")

const fs = require("fs")

const createTree = async (file) => {
    const fileStream = fs.createReadStream(file)
    const rl = readline.createInterface({
        input: fileStream,
    })

    const tree = {}
    let dir = []
    let size = 0
    let deep = 0
    let fileCount = 0
    for await (const line of rl) {
        if (line.match(/^\$ cd .*$/g)) {
            let currentDir = line.match(/(?<=\$ cd ).*/g)[0]
            if (currentDir == "/") {
                currentDir = "root"
            }
            if (currentDir !== "..") {
                dir.push(currentDir)
                if (deep === 0) {
                    tree[currentDir] = {}
                } else {
                    insertIntoTree(tree, currentDir, dir, deep)
                }
                fileCount = 0
                deep++
            } else {
                dir.pop()
                fileCount = 0
                deep--
            }
        }
        if (line.match(/^dir+/g)) {
            const directory = line.match(/(?<=dir ).*/g)[0]
            insertIntoTree(tree, directory, dir, deep, "dir")
        }
        if (line.match(/^\d+/g)) {
            size = parseInt(line.match(/^\d+/g)[0])
            const name = line.match(/(?<=\d+ ).*/g)[0]
            const insertObj = {
                name: name,
                size: size,
            }
            insertObj[name] = size
            insertIntoTree(tree, insertObj, dir, deep, "file")
            fileCount++
        }
    }
    let sumOfSums = 0
    //Calculate the total size of each directory where the total size is at most 1000000
    const calculateSize = (tree) => {
        for (let key in tree) {
            if (typeof tree[key] === "object") {
                calculateSize(tree[key])
            }
        }
        let sum = 0
        for (let key in tree) {
            if (typeof tree[key] === "number") {
                sum += tree[key]
            }
        }
        if (sum < 1000000) {
            sumOfSums += sum
        }
    }
    calculateSize(tree)
    console.log(sumOfSums)
    console.log(util.inspect(tree, false, null, true))
    return tree
}
const insertIntoTree = (tree, insert, dir, depth, type) => {
    //set object path where insertion will occur
    let path = "tree"
    for (let i = 0; i < depth; i++) {
        path += `.${dir[i]}`
    }

    if (type === "file") {
        eval(path)[insert.name] = insert.size
    } else {
        eval(path)[insert] = {}
    }

    return tree
}

createTree(input)
