let arr = [
    { name: 'jack' },
    { name: 'mary' },
]

let arr2=[]
arr.map((item, index) => {
    item = { ...item, key: index }
    arr2.push(item)

})

console.log(arr2);