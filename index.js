const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const { 
  getTalkers,
  validationEmail,
  validationPassword,
  generationToken,
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationWatchedAt,
  validationRate,
} = require('./talkerManHelpers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const talkers = await getTalkers();
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(200).json([]);
  }
});

app.get('/talker/search', validationToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await getTalkers();
  if (!q || q === '') {
    return res.status(200).json(talkers);
  }
  const searchTalkers = talkers.filter((talker) => talker.name.includes(q));
  res.status(200).json(searchTalkers);
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

app.post('/login', validationEmail, validationPassword, async (req, res) => {
  const generateToken = generationToken();
  res.status(200).json(generateToken);
});

app.post(
  '/talker',
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationWatchedAt,
  validationRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await getTalkers();
    const newTalker = { name, age, id: talkers.length + 1, talk };
    res.status(201).send(newTalker);
    talkers.push(newTalker);
    fs.writeFile('./talker.json', JSON.stringify(talkers, null, 2));
  },
);

app.put(
  '/talker/:id',
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationWatchedAt,
  validationRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const { id } = req.params;
    const talkers = await getTalkers();
    const talkerEdited = talkers.map((talker) => {
      if (talker.id === Number(id)) {
        return { name, age, id: Number(id), talk };
      }
      return talkers;
    });
    fs.writeFile('./talker.json', JSON.stringify(talkerEdited, null, 2));
    return res.status(200).json({ name, age, id: Number(id), talk });
  },
);

app.delete('/talker/:id', validationToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
  res.status(204).json();
  fs.writeFile('./talker.json', JSON.stringify(newTalkers, null, 2));
});

app.listen(PORT, () => {
  console.log('Online');
});
