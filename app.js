const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config()



const fornecedoresRouter = require("./routes/fornecedoresRotas");
const editarFornecedorRoute = require("./routes/editarFornecedorRoute");
const mostrarFornecedoresRouter = require('./routes/mostrarFornecedoresRoute');
const deleteFornecedorRouter = require('./routes/deleteFornecedorRoute');

const produtosRotas = require('./routes/produtosRotas');
const mostrarProdutosRouter = require('./routes/mostrarProdutosRotas');
const deleteProdutoRouter = require('./routes/deleteProdutoRoute');
const editarProdutoRoute = require("./routes/editarProdutoRoute");

const usuariosRouter = require('./routes/usuariosRotas');
const mostrarUsuariosRouter = require('./routes/mostrarUsuariosRoute');
const editarUsuarioRoute = require("./routes/editarUsuarioRoute");
const deleteUsuarioRouter = require('./routes/deleteUsuarioRoute');

const dashboardRoutes = require('./routes/dashboardRoute');

const loginRouter = require('./routes/loginRoute')
const authMiddleware = require('./middlewares/authMiddleware')
const verificarAdmin = require('./db/verificarAdmin');

const relatoriosRoutes = require('./routes/relatoriosRoute');


// Verifica ao iniciar o servidor
verificarAdmin().then(existeAdmin => {
    if (!existeAdmin) {
        console.log('⚠️  Acesse /cadastro-inicial para criar o primeiro usuário admin');
    }
});



app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/produtos', produtosRotas);
app.use("/api/fornecedores", fornecedoresRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/produtosmostrar', mostrarProdutosRouter);
app.use('/api/deleteprodutos', deleteProdutoRouter);
app.use("/api/produtos", editarProdutoRoute);
app.use("/api/usuariosmostrar", mostrarUsuariosRouter);
app.use("/api/usuarios", editarUsuarioRoute);
app.use('/api/deleteusuarios', deleteUsuarioRouter);
app.use("/api/fornecedores", editarFornecedorRoute);
app.use('/api/fornecedoresmostrar', mostrarFornecedoresRouter);
app.use('/api/deletefornecedores', deleteFornecedorRouter);
app.use('/api/dashboard', dashboardRoutes);

app.use('/api/relatorios', relatoriosRoutes);

app.use('/api', loginRouter)



// Use a porta do ambiente OU 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
