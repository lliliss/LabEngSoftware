const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();

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
const adminMiddleware = require('./middlewares/adminMiddleware');
const verificarAdmin = require('./db/verificarAdmin');

const relatoriosRoutes = require('./routes/relatoriosRoute');
const atualizarEstoqueRoute = require('./routes/mudarQuantidadeProduto');

// Adicione esta linha para importar as rotas de notificações
const notificacoesRouter = require('./routes/notificacoesRoute');

// Verifica ao iniciar o servidor
verificarAdmin().then(existeAdmin => {
    if (!existeAdmin) {
        console.log(' Acesse /cadastro-inicial para criar o primeiro usuário admin');
    }
});

app.use(cors({
  origin: ['http://localhost:5000', "https://pharmasafe.vercel.app/login/logins.html"], // ou seu domínio
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas públicas
app.use('/api', loginRouter)

// Rotas autenticadas comuns
app.use('/api/produtos', authMiddleware, produtosRotas);
app.use('/api/produtosmostrar', authMiddleware, mostrarProdutosRouter);
app.use('/api/deleteprodutos', authMiddleware, deleteProdutoRouter);
app.use("/api/produtos", authMiddleware, editarProdutoRoute);

app.use("/api/fornecedores", authMiddleware, fornecedoresRouter);
app.use("/api/fornecedores", authMiddleware, editarFornecedorRoute);
app.use('/api/fornecedoresmostrar', authMiddleware, mostrarFornecedoresRouter);
app.use('/api/deletefornecedores', authMiddleware, deleteFornecedorRouter);

app.use('/api/dashboard', authMiddleware, dashboardRoutes);
app.use('/api/relatorios', authMiddleware, relatoriosRoutes);

app.use('/api', authMiddleware, atualizarEstoqueRoute);

app.use('/api/notificacoes', authMiddleware, notificacoesRouter);

// Rotas administrativas
app.use('/api/usuarios', authMiddleware, adminMiddleware, usuariosRouter);
app.use("/api/usuariosmostrar", authMiddleware, adminMiddleware, mostrarUsuariosRouter);
app.use("/api/usuarios", authMiddleware, adminMiddleware, editarUsuarioRoute);
app.use('/api/deleteusuarios', authMiddleware, adminMiddleware, deleteUsuarioRouter);

// Use a porta do ambiente OU 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});