const validationToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
    }
  
  if (authorization.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });  
    }
  next();      
};

const validationAge = (req, res, next) => {
  const { age } = req.body;
  
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validationName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validationTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  const { watchedAt } = talk;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
  
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }    
  next();
};
// Regex reference:https://bobbyhadz.com/blog/javascript-date-validation-dd-mm-yyyy//
  
const validationRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate && rate !== 0) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
validationName,
validationAge,
validationTalk,
validationRate,
validationToken };