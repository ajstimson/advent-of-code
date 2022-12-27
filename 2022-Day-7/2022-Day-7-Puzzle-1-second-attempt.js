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
            const name = `file${fileCount}`
            const insertObj = {}
            insertObj[name] = size
            insertIntoTree(tree, insertObj, dir, deep, "file")
            fileCount++
        }
    }

    console.log(util.inspect(tree, false, null, true))
    return tree
}
const insertIntoTree = (tree, insert, dir, depth, type) => {
    let i = depth
    //set object path where insertion will occur
    console.log("DIR", dir)
    let path = "tree"
    for (let i = 0; i < depth; i++) {
        path += `.${dir[i]}`
    }
    console.log("PATH", path)

    if (type === "file") {
        eval(path).insert = insert
    } else {
        eval(path).insert = {}
    }

    console.log(util.inspect(tree, false, null, true))
    return tree
}

function setValue(obj, path) {
    if (!path) return obj
    const properties = path.split(".")
    return setValue(obj[properties.shift()], properties.join("."))
}

createTree(example)
