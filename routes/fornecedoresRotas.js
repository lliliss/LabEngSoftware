const { v4: uuidv4} = require('uuid')
const express = require("express")
const router = express.Router()
const fornecedores = require("../data/fornecedores")


router.get("/", (req, res) => {
    res.json(fornecedores)
})

router.get("/:id", (req, res) => {
    const fornecedor = fornecedores.find(f => f.id === parseInt(req.params.id))
    if (!fornecedor) return res.status(404).json ({message: "Fornecedor não encontrado."})
    res.json(fornecedor)
})

router.post("/", (req, res) => {
    const {nome, cnpj, contato, medicamento, quantidade} = req.body

    if (!nome || !cnpj || !contato || !medicamento || !quantidade) {
        return res.status(400).json ({message:"Todos os campos são obrigatórios!"})
    }

    if (isNaN(quantidade) || quantidade <= 0) {
        return res.status(400).json ({message:"Coloque números válidos."})
    }

    const novoFornecedor = {
        id: uuidv4(),
        nome,
        cnpj,
        contato,
        medicamento,
        quantidade: Number(quantidade)
    }

    fornecedores.push(novoFornecedor)
    res.status(201).json(novoFornecedor)
})

router.put("/:id", (req, res) => {
    const fornecedor = fornecedores.find(f => f.id === parseInt(req.params.id))
    if (!fornecedor) return res.status(404).json({message: "Fornecedor não encontrado."})

    const {nome, cnpj, contato, medicamento, quantidade} = req.body
    fornecedor.nome = nome || fornecedor.nome
    fornecedor.cnpj = cnpj || fornecedor.cnpj
    fornecedor.contato = contato || fornecedor.contato
    fornecedor.medicament0 = medicamento || fornecedor.medicamento
    fornecedor.quantidade = quantidade || fornecedor.quantidade

    res.json({message:"Atualização de fornecedor bem sucedida.", fornecedor})
})

router.delete("/:id", (req, res) => {
    fornecedores = fornecedores.filter(f => f.id !== parseInt(req.params.id))
    res.json({message:"Fornecedor removido com sucesso."})
})

module.exports = router