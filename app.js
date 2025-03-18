const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const produtosRotas = require("./routes/produtosRotas")

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use("/api/produtos", produtosRotas)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Rodando o servidor na porta ${PORT}`)
})