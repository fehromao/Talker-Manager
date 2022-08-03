const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('./helpers');

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

app.listen(PORT, () => {
  console.log('Online');
});
