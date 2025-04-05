const { v4: uuidv4} = require('uuid')
let fornecedores = [
    {id: uuidv4(), nome: "MedLife", cnpj: "56.789.012/0001-34", contato: "(21) 12345-6789", medicamento: "Paracetamol", quantidade: 150},
    {id: uuidv4(), nome: "PharmaCorp", cnpj: "45.567.901/0001-23", contato: "(41) 23456-7890", medicamento: "Amoxicilina", quantidade: 120}
]

module.exports = fornecedores;