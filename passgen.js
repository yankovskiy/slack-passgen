const C = require('./const');

function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function passgen(symbols, count, size) {
    const alfa = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const numbers = '1234567890';
    const specail = '!@#$%^&*()_+-=';

    let passwordData = '';
    if (symbols === C.ALFA_ONLY) {
        passwordData = alfa;
    } else if (symbols === C.NUMBERS_ONLY) {
        passwordData = numbers;
    } else if (symbols === C.ALFA_AND_NUMBERS) {
        passwordData = alfa + numbers;
    } else if (symbols === C.ANY) {
        passwordData = alfa + numbers + specail;
    }

    const passwords = [];
    const passwordDataLength = passwordData.length;
    for (let i = 0; i < count; i++) {
        let password = '';
        for (let x = 0; x < size; x++) {
            password += passwordData[randomInteger(0, passwordDataLength - 1)];
        }
        passwords.push(password);
    }

    return passwords;
}

module.exports = passgen;