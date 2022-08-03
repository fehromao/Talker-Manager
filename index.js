const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const helpers = require('./helpers');
const validationLogin = require('./midlleware/validationLogin');
const {
  validationName,
  validationAge,
  validationTalk,
  validationRate,
  validationToken } = require('./midlleware/validationNewTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await helpers.readTalkersFile('talker.json');

  if (talkers.length < 1) return res.status(200).json([]);

  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await helpers.readTalkersFile('talker.json');
  const findTalker = talkers.find((talker) => talker.id === Number(id));
  if (!findTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
}
  return res.status(200).json(findTalker);
});

app.post('/login', validationLogin, (req, res) => {
  const token = helpers.generateToken();
  res.status(200).json({ token });
});

app.post('/talker', validationToken, validationName,
  validationAge, validationTalk, validationRate, async (req, res) => {
  const newTalker = req.body;
  const talkers = await helpers.readTalkersFile('talker.json');
  newTalker.id = talkers[talkers.length - 1].id + 1;
  talkers.push(newTalker);
  await fs.writeFile('talker.json', JSON.stringify(talkers));
  return res.status(201).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
