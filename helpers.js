const fs = require('fs/promises');
const crypto = require('crypto');

const readTalkersFile = async (path) =>  
  JSON.parse(await fs.readFile(path, 'utf-8'));

const writeTalkersFile = (data) =>  
  fs.writeFile('talker.json', JSON.stringify(data));

const generateToken = () => crypto.randomBytes(8).toString('hex');

module.exports = { readTalkersFile, generateToken, writeTalkersFile };