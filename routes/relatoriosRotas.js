const express = require('express')
const router = express.Router()
const PDFDocument = require('pdfkit')
const pool = require('../db')

router.post('/gerar', async (req, res) => {
  const { tipos, dataInicial, dataFinal } = req.body

  if (!tipos || !Array.isArray(tipos) || tipos.length === 0 || !dataInicial || !dataFinal) {
    return res.status(400).json({error: 'Dados incompletos ou inválidos para gerar relatório.'})
  }

  const doc = new PDFDocument()
  const filename = `relatorio_${Date.now()}.pdf`

  res.setHeader('Content-disposition', `attachment; filename="${filename}"`)
  res.setHeader('Content-type', 'application/pdf')
  doc.pipe(res)


  doc.fontSize(20).text("Relatório - PharmaSafe", {align: 'center'})
  doc.moveDown()
  doc.fontSize(12).text(`Período: ${dataInicial} até ${dataFinal}`)
  doc.moveDown()

  try {
    if (tipos.includes("Produtos")) {
      const produtos = await pool.query(
        `SELECT nome, quantidade, data_entrada FROM produtos
         WHERE data_entrada BETWEEN $1 AND $2`,
        [dataInicial, dataFinal]
      )

      doc.fontSize(16).text("📦 Produtos", { underline: true })
      doc.moveDown()

      if (produtos.rows.length === 0) {
        doc.fontSize(12).text("Nenhum produto encontrado no período.")
      } else {
        produtos.rows.forEach(prod => {
          doc.fontSize(14).text(`✔ ${prod.nome}`)
          doc.fontSize(10).text(`Qtd: ${prod.quantidade} - Entrada: ${prod.data_entrada.toISOString().split('T')[0]}`, {indent: 20})
          doc.moveDown()
        })
      }

      doc.moveDown()
    }

    if (tipos.includes("Fornecedores")) {
      const fornecedores = await pool.query(
        `SELECT nome, cnpj, criado_em FROM fornecedores
         WHERE criado_em BETWEEN $1 AND $2`,
        [dataInicial, dataFinal]
      )

      doc.fontSize(16).text("🏭 Fornecedores", {underline: true})
      doc.moveDown()

      if (fornecedores.rows.length === 0) {
        doc.fontSize(12).text("Nenhum fornecedor encontrado no período.")
      } else {
        fornecedores.rows.forEach(f => {
          doc.fontSize(14).text(`✔ ${f.nome}`)
          doc.fontSize(10).text(`CNPJ: ${f.cnpj} - Cadastro: ${f.criado_em.toISOString().split('T')[0]}`, {indent: 20})
          doc.moveDown()
        })
      }

      doc.moveDown();
    }

    doc.end()
  } catch (err) {
    console.error("Erro ao gerar PDF:", err)
    res.status(500).json({error: "Erro ao gerar relatório."})
  }
})

module.exports = router;