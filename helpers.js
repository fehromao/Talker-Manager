const fs = require('fs/promises');

const readTalkersFile = async (path) =>  
  JSON.parse(await fs.readFile(path, 'utf-8'));

module.exports = { readTalkersFile };