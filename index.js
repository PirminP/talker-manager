const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3002';

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

app.listen(PORT, () => {
  console.log('Online');
});
