/*  
    * 2022 Day 6 Puzzle 1
    ! Parse the input file which contains the details of your search of the file system.
    ! Find all of the directories with a total size of _at most 100000_. 
    ! What is the sum of the total sizes of those directories?

    example input:
    $ cd /
    $ ls
    dir a
    14848514 b.txt
    8504156 c.dat
    dir d
    $ cd a
    $ ls
    dir e
    29116 f
    2557 g
    62596 h.lst
    $ cd e
    $ ls
    584 i
    $ cd ..
    $ cd ..
    $ cd d
    $ ls
    4060174 j
    8033020 d.log
    5626152 d.ext
    7214296 k

    plan of attack:
    store each use of cd (discard once cd is used again)
    listen for the use of 'ls'
    if 'ls' is used, then the next line will be the directory contents
    parse the directory contents for the size of each file
    if the size is a number, add it to the total size of the directory and store in an object
    
    Part One: 2104783
    Part Two: 5883165
 */

const readline = require("readline")
const example = "example.txt"
const input = "input.txt"

const fs = require("fs")
const obj = {}
const parseData = async (file, max) => {
    const fileStream = fs.createReadStream(file)
    const rl = readline.createInterface({
        input: fileStream,
    })
    let dir = []
    let size = 0
    let i = 0
    for await (const line of rl) {
        console.log(parents)
        if (line.match(/^\$ cd .*$/g)) {
            const currentDir = parents + line.match(/(?<=\$ cd ).*/g)[0]
            if (currentDir === "..") {
                dir.pop()
                //add child directory size to parent directory, if sum is less than max
                let parent = obj[dir[dir.length - 1]]

                if (dir.length > 1) {
                    if (parent) {
                        parent.size = parent.size + size + size
                    } else {
                        obj[dir[dir.length - 1]] = { size: size }
                    }
                }
            } else {
                dir.push(currentDir)
            }
        }
        if (line.match(/^\d+/g)) {
            size = parseInt(line.match(/^\d+/g)[0])

            !obj[dir[dir.length - 1]]
                ? (obj[dir[dir.length - 1]] = { size })
                : (obj[dir[dir.length - 1]].size =
                      obj[dir[dir.length - 1]].size + size)
        }
    }
    //Return sum of all directory sizes only if size is less than max
    let sum = 0
    for (let key in obj) {
        if (obj[key].size < max) {
            console.log(key, obj[key].size)
            sum += obj[key].size
        }
    }
    console.log(sum)
    return sum
}
parseData(example, 100000)
