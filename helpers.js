const fs = require('fs/promises');
const crypto = require('crypto');

const readTalkersFile = async (path) =>  
  JSON.parse(await fs.readFile(path, 'utf-8'));

const generateToken = () => crypto.randomBytes(8).toString('hex');

const writeTalkersFile = async () => {
  try {
    await fs.writeFile('talker.json', {
      name: 'Danielle Santos',
      age: 56,
      talk: {
        watchedAt: '22/10/2019',
        rate: 5,
      },
    });
  } catch (err) {
    console.error(`Erro ao escrever o arquivo: ${err.message}`);
  }
};

module.exports = { readTalkersFile, generateToken, writeTalkersFile };