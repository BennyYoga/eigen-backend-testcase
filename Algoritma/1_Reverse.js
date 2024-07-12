function reverseAlphabet(input) {
    let letters = [];
    let digits = [];

    for (let char of input) {
        if (isNaN(char)) {
            letters.push(char);
        } else {
            digits.push(char);
        }
    }
    letters.reverse();
    return letters.join('') + digits.join('');
}

let input = "NEGIE1";
let output = reverseAlphabet(input);
console.log(output);