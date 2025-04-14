const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const produtosRotas = require("./routes/produtosRotas")
const fornecedoresRotas = require("./routes/fornecedoresRotas")
const path = require("path")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

app.use("/api/produtos", produtosRotas)
app.use("/api/fornecedores", fornecedoresRotas)

app.use(express.static(path.join(__dirname)))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"index.html"))
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Rodando o servidor na porta ${PORT}`)
})