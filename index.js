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
  validationWatchedAtAndRate,
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
  const saveToken = JSON.parse(await fs.readFile('./generateToken.json', 'utf8'));
  saveToken.push(generateToken);
  fs.writeFile('./generateToken.json', JSON.stringify(saveToken));
});

app.post(
  '/talker',
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationWatchedAtAndRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await getTalkers();
    const newTalker = { name, age, id: talkers.length + 1, talk };
    res.status(201).send(newTalker);
    talkers.push(newTalker);
    fs.writeFile('./talker.json', JSON.stringify(talkers, null, 2));
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
