const fs = require('fs/promises');
const crypto = require('crypto');

const readTalkersFile = async (path) =>  
  JSON.parse(await fs.readFile(path, 'utf-8'));

const generateToken = () => crypto.randomBytes(8).toString('hex');

const validationLogin = async (email,password) => {
  
};

module.exports = { readTalkersFile, generateToken, validationLogin };