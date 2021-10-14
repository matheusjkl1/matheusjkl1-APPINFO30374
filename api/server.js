const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const data = require('./data/data')
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 3003;

app.get('/', async (_, res) => {
  return res.status(200).json(data)
})

app.listen(PORT, () => (console.log(`Servidor Ligado na porta ${PORT}`)));
