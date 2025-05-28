const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const produtosRotas = require('./routes/produtosRotas');
const fornecedoresRouter = require("./routes/fornecedoresRotas");
const usuariosRouter = require('./routes/usuariosRotas');
const produtosRouter = require('./routes/mostrarProdutosRotas');
const deleteProdutoRouter = require('./routes/deleteProdutoRoute');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/produtos', produtosRotas);
app.use("/api/fornecedores", fornecedoresRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/produtosmostrar', produtosRouter);
app.use('/api/deleteprodutos', deleteProdutoRouter);

// Use a porta do ambiente OU 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
