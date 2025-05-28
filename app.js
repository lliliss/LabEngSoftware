const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const produtosRotas = require('./routes/produtosRotas');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/produtos', produtosRotas); // prefixo da rota

// Use a porta do ambiente OU 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
