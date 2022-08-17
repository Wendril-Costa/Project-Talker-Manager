const express = require('express');
const bodyParser = require('body-parser');
// const talkerData = require('./talker.json');
const fs = require('fs/promises');

const app = express();
app.use(bodyParser.json());

const getTalkerData = async () => {
  const arrayTalkers = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(arrayTalkers);
}

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  try {
    const arrayTalkers = await getTalkerData();

    return res.status(200).json(arrayTalkers);
  } catch (error) {
    return res.status(500).end();
  }
});

