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
const FILE = 'talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await helpers.readTalkersFile(FILE);

  if (talkers.length < 1) return res.status(HTTP_OK_STATUS).json([]);

  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/search', validationToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await helpers.readTalkersFile(FILE);
  const searchTalker = talkers.filter((talker) => talker.name.includes(q));
  await helpers.writeTalkersFile(searchTalker);
  if (!q) return res.status(HTTP_OK_STATUS).json(talkers);
  return res.status(HTTP_OK_STATUS).json(searchTalker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await helpers.readTalkersFile(FILE);
  const findTalker = talkers.find((talker) => talker.id === Number(id));
  if (!findTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
}
  return res.status(HTTP_OK_STATUS).json(findTalker);
});

app.post('/login', validationLogin, (req, res) => {
  const token = helpers.generateToken();
  res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', validationToken, validationName,
  validationAge, validationTalk, validationRate, async (req, res) => {
  const newTalker = req.body;
  const talkers = await helpers.readTalkersFile(FILE);
  newTalker.id = talkers[talkers.length - 1].id + 1;
  talkers.push(newTalker);
  await fs.writeFile(FILE, JSON.stringify(talkers));
  return res.status(201).json(newTalker);
});

app.put('/talker/:id', validationToken, validationName,
  validationAge, validationTalk, validationRate, async (req, res) => {
    const { id } = req.params;
    const talker = req.body;
    const talkers = await helpers.readTalkersFile(FILE);
    const talkerInfo = talkers.map((t) => {
      if (t.id === Number(id)) {
        return { ...t, ...talker, id: Number(id) };
      } 
      return t;
    });
    await helpers.writeTalkersFile(talkerInfo);
    return res.status(200).json({ ...talker, id: Number(id) });
});

app.delete('/talker/:id', validationToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await helpers.readTalkersFile(FILE);
  const talkerInfo = talkers.filter((t) => t.id !== Number(id));
  await helpers.writeTalkersFile(talkerInfo);
    return res.status(204).end();
  });

app.listen(PORT, () => {
  console.log('Online');
});
