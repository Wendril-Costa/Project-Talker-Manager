const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const generateToken = require('./generateToken');

const valEmail = require('./middlewares/valEmail');
const valPass = require('./middlewares/valPass');
const valToken = require('./middlewares/valToken');
const valName = require('./middlewares/valName');
const valAge = require('./middlewares/valAge');
const valTalk = require('./middlewares/valTalk');
const valWatchedAt = require('./middlewares/valWatchedAt');
const valRate = require('./middlewares/valRate');

const app = express();
app.use(bodyParser.json());

const getTalkerData = async () => {
  const arrayTalkers = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(arrayTalkers);
};

function setTalkerData(newTalkerData) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalkerData));
}

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const PAGE_NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const CREATED = 201;
const NO_CONTENT = 204;

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  try {
    const arrayTalkers = await getTalkerData();

    return res.status(HTTP_OK_STATUS).json(arrayTalkers);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
});

app.get('/talker/search', 
  valToken,
  async (req, res) => {
  try {  
  const arrayTalkers = await getTalkerData();
  const { q } = req.query;
  const filterTalker = arrayTalkers.filter((t) => t.name.includes(q));

  return res.status(HTTP_OK_STATUS).json(filterTalker);
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

app.post('/login', 
  valPass,
  valEmail,
  (_req, res) => {
  try {
    const token = generateToken();

    return res.status(HTTP_OK_STATUS).json({ token });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
});

app.post('/talker', 
  valToken,
  valName,
  valAge,
  valTalk,
  valWatchedAt,
  valRate,
  async (req, res) => {
  try {
    const arrayTalkers = await getTalkerData();
    const { name, age, talk: { watchedAt, rate } } = req.body;
    
    const getId = (arrayTalkers[arrayTalkers.length - 1]);
    const { id } = getId;

    const addId = id + 1;
    const newTalker = { id: addId, name, age, talk: { watchedAt, rate } };

    arrayTalkers.push(newTalker);
    await setTalkerData(arrayTalkers);

    return res.status(CREATED).json(newTalker);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
});

app.put('/talker/:id', 
  valToken,
  valName,
  valAge,
  valTalk,
  valWatchedAt,
  valRate,
  async (req, res) => {
  try {
    const arrayTalkers = await getTalkerData();
    const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const typeNumber = Number(id);
    const index = arrayTalkers.findIndex((t) => t.id === typeNumber);
    arrayTalkers[index] = { 
      id: typeNumber,
      name, 
      age, 
      talk: { watchedAt, rate }, 
    };
    
    await setTalkerData(arrayTalkers);
    return res.status(HTTP_OK_STATUS).json(arrayTalkers[index]);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
});

app.delete('/talker/:id', 
  valToken,
  async (req, res) => {
  try {
    const arrayTalkers = await getTalkerData();
    const { id } = req.params;
    const newArray = arrayTalkers.filter((t) => t.id !== Number(id));

    await setTalkerData(newArray);
    return res.status(NO_CONTENT).end();
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
});