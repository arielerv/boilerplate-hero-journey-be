require('dotenv').config();
const crypto = require('crypto');
const {CRYPT_KEY} = process.env;

const config = {
    cryptkey: crypto.createHash('sha256').update(CRYPT_KEY).digest(),
    iv: '077NLgyjM9Me3K5d'
};
const hash = (input, encoding) => crypto.createHash('sha256').update(input).digest(encoding || 'base64');

const encrypt = (input, encoding) => {
    encoding = encoding || 'base64';
    const cipher = crypto.createCipheriv('aes-256-cbc', config.cryptkey, config.iv);
    return Buffer.concat([
        cipher.update(input),
        cipher.final()
    ]).toString(encoding);
};

const decrypt = (input, encoding) => {
    encoding = encoding || 'base64';
    const decipher = crypto.createDecipheriv('aes-256-cbc', config.cryptkey, config.iv);
    const formattedText = input.replaceAll(' ', '+');

    return Buffer.concat([
        decipher.update(formattedText, encoding),
        decipher.final()
    ]).toString();
};

module.exports = {
    hash,
    encrypt,
    decrypt
};
