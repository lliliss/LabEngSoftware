import {v4 as uuidv4} from 'uuid'

const express = require("express")
const router = express.Router()
let produtos = require("../data/produtos")

router.get("/", (req, res) => {
    res.json(produtos)
})

router.get("/:id", (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id))
    if (!produto) return res.status(404).json ({message: "Produto sem estoque!"})
    res.json(produto)
})

router.post("/", (req, res) => {
    const {nome, categoria, quantidade, validade, fornecedor, numeSerie} =  req.body

    if (!nome || !categoria || !quantidade || !validade || !fornecedor || !numeSerie) {
        return res.status(400).json({message: "Preencha todos os campos!"})
    }

    if (isNaN(quantidade) || quantidade < 0) {
        return res.status(400).json({message: "Coloque números válidos."})
    }

    const novoProduto = {
        id: uuidv4(),
        nome,
        categoria,
        quantidade: Number(quantidade),
        validade,
        fornecedor,
        numeSerie: Number
    }

    produtos.push(novoProduto)
    res.status(201).json(novoProduto)
})

router.put("/:id", (req, res) => {
    const {nome, categoria, quantiade, validade, fornecedor, numeSerie} = req.body
    const produto = produtos.find(p => p.id === parseInt(req.params.id))

    if (!produto) return res.status(404).json({message: "Produto não encontrado."})

    produto.nome = nome || produto.nome
    produto.categoria = categoria || produto.categoria
    produto.quantidade = quantidade || produto.quantidade
    produto.validade = validade || produto.validade
    produto.fornecedor = fornecedor || produto.fornecedor
    produto.numeSerie = numeSerie || produto.numeSerie

    res.json(produto)
})

router.delete("/:id", (req, res) => {
    const index = produtos.findIndex(p => p.id === parseInt(req.params.id))

    if (index === -1) return res.status(404).json({message: "Produto não encontrado."})

    produtos.splice(index, 1)
    res.status(204).send()
})

module.exports = router
