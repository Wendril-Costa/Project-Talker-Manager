const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
app.use(bodyParser.json());

const getTalkerData = async () => {
  const arrayTalkers = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(arrayTalkers);
};

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const PAGE_NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  try {
    const arrayTalkers = await getTalkerData();

    return res.status(HTTP_OK_STATUS).json(arrayTalkers);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const arrayTalkers = await getTalkerData();
    const { id } = req.params;

    const talker = arrayTalkers.find((t) => t.id === Number(id));

    if (!talker) {
      return res.status(PAGE_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
});