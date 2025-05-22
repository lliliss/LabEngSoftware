const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

const produtosRotas = require('./routes/produtosRotas')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/produtos', produtosRotas); // prefixo da rota

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor rodando na porta 3000')
})

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000")
})