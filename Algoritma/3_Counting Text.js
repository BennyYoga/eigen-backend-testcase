function countingText(input, query) {
    let output = [];

    for (let q of query) {
        let count = 0;
        for (let i of input) {
            if (i === q) {
                count++;
            }
        }
        output.push(count);
    }

    return output;
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
console.log(countingText(INPUT, QUERY)); 
