const {v4: uuidv4} = require('uuid')
let produtos = [
    {id: uuidv4(), nome: "Paracetamol 500mg", categoria: "Analgésicos", quantidade: 150, validade: "12-03-2025", fornecedor: "MedLife", numeSerie: "X23Y9"},
    {id: uuidv4(), nome: "Amoxilina 500mg", categoria: "Antibióticos", quantidade: 50, validade: "15-03-2025", fornecedor: "PharmaCorp", numeSerie: "P90S3"}
]

module.exports = produtos;