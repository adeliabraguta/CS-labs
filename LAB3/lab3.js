function getAlphabet() {
    return "AĂÂBCDEFGHIÎJKLMNOPQRSȘTȚUVWXYZ".split('');
}

function encrypt(plaintext, key) {
    check(key);
    const plainList = plaintext.toUpperCase().replace(/ /g, '').split('');
    const keyList = key.toUpperCase().replace(/ /g, '').split('');
    let keyFullList = [];
    for (let i = 0; i < plainList.length; i++) {
        keyFullList.push(keyList[ i % keyList.length]);
    }
    const plainPosition = plainList.map(character => getAlphabet().indexOf(character));
    const keyFullPosition = keyFullList.map(character => getAlphabet().indexOf(character));
    const difference = [];
    for (let s = 0; s < plainPosition.length; s++) {
        difference.push((plainPosition[s] + keyFullPosition[s]) % getAlphabet().length);
    }
    return difference.map(index => getAlphabet()[index]).join('');
}

function decrypt(ciphertext, key) {
    check(key);
    const alphabet = getAlphabet();
    key = key.toUpperCase();
    let plaintext = '';
    let keyIndex = 0;

    for (let i = 0; i < ciphertext.length; i++) {
        const currentChar = ciphertext.charAt(i);

        if (alphabet.includes(currentChar)) {
            const charIndex = alphabet.indexOf(currentChar);
            const shift = alphabet.indexOf(key[keyIndex % key.length]);
            const decryptedChar = alphabet[(charIndex - shift + alphabet.length) % alphabet.length];
            plaintext += decryptedChar;
            keyIndex++;
        } else {
            plaintext += currentChar;
        }
    }

    return plaintext;
}

function check(key) {
    if (key.length < 7) {
        console.log("Is less than 7");
        throw new Error();
    }
}

// Example usage:
const plaintext = "Mă duc la universitate";
const key = "Braguța";

const encryptedText = encrypt(plaintext, key);
const decryptedText = decrypt(encryptedText, key);

console.log("Original Text: " + plaintext);
console.log("Encrypted Text: " + encryptedText);
console.log("Decrypted Text: " + decryptedText);