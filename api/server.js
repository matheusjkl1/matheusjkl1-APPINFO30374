const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const data = require('./data/data')

const app = express();
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 3003;

app.get('/', async (_req, res) => {
  return res.status(200).json(data)
})

app.post('/', async (req, res) => {
  return res.status(200).json(req.body)
})

app.listen(PORT, () => (console.log(`Servidor Ligado na porta ${PORT}`)));
