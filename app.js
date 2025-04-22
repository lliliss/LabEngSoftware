const express = require("express")
const cors = require("cors")
const fornecedoresRotas = require("./routes/fornecedoresRotas")
const produtosRotas = require("./routes/produtosRotas")
const relatoriosRotas = require("./routes/relatoriosRotas")
const path = require("path")
const app = express()
const pool = require('./db')
require('dotenv').config();


app.use(express.static(path.join(__dirname, "public")))

app.use(cors())
app.use(express.json())

app.use("/api/produtos", produtosRotas)
app.use("/api/fornecedores", fornecedoresRotas)
app.use("/api/relatorios", relatoriosRotas)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Rodando o servidor na porta ${PORT}`)
})