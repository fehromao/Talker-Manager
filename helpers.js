const fs = require('fs/promises');
const crypto = require('crypto');

const readTalkersFile = async (path) =>  
  JSON.parse(await fs.readFile(path, 'utf-8'));

const generateToken = () => crypto.randomBytes(8).toString('hex');

const validationLogin = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}

  if (!password) { 
    return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
}

  if (password.length < 6) { 
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }  
  next();
};

const writeTalker = () => {};

module.exports = { readTalkersFile, generateToken, validationLogin, writeTalker };