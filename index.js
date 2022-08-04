const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const { validationEmail, validationPassword, generationToken } = require('./talkerManHelpers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

async function getTalkers() {
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf8'));
  return talkers;
}

app.get('/talker', async (req, res) => {
  try {
    const talkers = await getTalkers();
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(200).json([]);
  }
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;
  const findTalkerId = talkers.find((talker) => talker.id === Number(id));

  if (!findTalkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(findTalkerId);
});

app.post('/login', validationEmail, validationPassword, (req, res) => {
  res.status(200).json(generationToken());
});

app.listen(PORT, () => {
  console.log('Online');
});
