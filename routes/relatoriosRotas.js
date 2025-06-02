const express = require('express')
const router = express.Router()
const PDFDocument = require('pdfkit')
// const pool = require('../db') 

router.post('/gerar', async (req, res) => {
  const { tipos, dataInicial, dataFinal } = req.body

  if (!tipos || !Array.isArray(tipos) || tipos.length === 0 || !dataInicial || !dataFinal) {
    return res.status(400).json({ error: 'Dados incompletos ou inválidos para gerar relatório.' })
  }

  const doc = new PDFDocument()
  const filename = `relatorio_${Date.now()}.pdf`

  res.setHeader('Content-disposition', `attachment; filename="${filename}"`)
  res.setHeader('Content-type', 'application/pdf')
  doc.pipe(res)

  doc.fontSize(20).text("Relatório - PharmaSafe", { align: 'center' })
  doc.moveDown()
  doc.fontSize(12).text(`Período: ${dataInicial} até ${dataFinal}`)
  doc.moveDown()

  try { // para os dados temporários antes de ir pra o banco
    const dadosMock = {
      produtos: [
        { nome: 'Dipirona', quantidade: 100, data_entrada: '2025-05-01' },
        { nome: 'Paracetamol', quantidade: 200, data_entrada: '2025-05-10' },
      ],
      fornecedores: [
        { nome: 'Farmaco Indústria', cnpj: '12.345.678/0001-99', criado_em: '2025-04-15' },
        { nome: 'BioSaúde Ltda.', cnpj: '98.765.432/0001-11', criado_em: '2025-05-05' },
      ]
    }

    if (tipos.includes("Produtos")) {
      const produtosFiltrados = dadosMock.produtos.filter(p =>
        p.data_entrada >= dataInicial && p.data_entrada <= dataFinal
      )

      doc.fontSize(16).text("📦 Produtos", { underline: true })
      doc.moveDown()

      if (produtosFiltrados.length === 0) {
        doc.fontSize(12).text("Nenhum produto encontrado no período.")
      } else {
        produtosFiltrados.forEach(prod => {
          doc.fontSize(14).text(`✔ ${prod.nome}`)
          doc.fontSize(10).text(`Qtd: ${prod.quantidade} - Entrada: ${prod.data_entrada}`, { indent: 20 })
          doc.moveDown()
        })
      }

      doc.moveDown()
    }

    if (tipos.includes("Fornecedores")) {
      const fornecedoresFiltrados = dadosMock.fornecedores.filter(f =>
        f.criado_em >= dataInicial && f.criado_em <= dataFinal
      )

      doc.fontSize(16).text("🏭 Fornecedores", { underline: true })
      doc.moveDown()

      if (fornecedoresFiltrados.length === 0) {
        doc.fontSize(12).text("Nenhum fornecedor encontrado no período.")
      } else {
        fornecedoresFiltrados.forEach(f => {
          doc.fontSize(14).text(`✔ ${f.nome}`)
          doc.fontSize(10).text(`CNPJ: ${f.cnpj} - Cadastro: ${f.criado_em}`, { indent: 20 })
          doc.moveDown()
        })
      }

      doc.moveDown()
    }

    doc.end()
  } catch (err) {
    console.error("Erro ao gerar PDF:", err)
    res.status(500).json({ error: "Erro ao gerar relatório." })
  }
})

module.exports = router