const express = require('express')
const router = express.Router()
const PDFDocument = require('pdfkit')
const pool = require('../db/conexao') // Certifique-se de que este caminho está correto
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/gerar', authMiddleware, async (req, res) => {
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

  try {
    if (tipos.includes("Produtos")) {
      // Consulta para produtos com entrada no período
      const produtosQuery = `
        SELECT p.nome, e.quantidade, e.created_at as data_entrada
        FROM estoque e
        JOIN produtos p ON e.produto_id = p.id_produto
        WHERE e.created_at BETWEEN $1 AND $2
        ORDER BY e.created_at
      `
      const { rows: produtos } = await pool.query(produtosQuery, [dataInicial, dataFinal])

      doc.fontSize(16).text("Entrada de Produtos", { underline: true })
      doc.moveDown()

      if (produtos.length === 0) {
        doc.fontSize(12).text("Nenhum produto encontrado no período.")
      } else {
        produtos.forEach(prod => {
          doc.fontSize(14).text(`✔ ${prod.nome}`)
          doc.fontSize(10).text(`Qtd: ${prod.quantidade} - Entrada: ${new Date(prod.data_entrada).toLocaleDateString()}`, { indent: 20 })
          doc.moveDown()
        })
      }
      doc.moveDown()
    }

    if (tipos.includes("Validade")) {
      // Consulta para produtos com validade próxima (próximos 30 dias)
      const hoje = new Date().toISOString().split('T')[0]
      const trintaDias = new Date()
      trintaDias.setDate(trintaDias.getDate() + 30)
      const dataLimite = trintaDias.toISOString().split('T')[0]

      const validadeQuery = `
        SELECT p.nome, l.data_validade, l.quantidade
        FROM lotes l
        JOIN produtos p ON l.produto_id = p.id_produto
        WHERE l.data_validade BETWEEN $1 AND $2
        ORDER BY l.data_validade
      `
      const { rows: produtosValidade } = await pool.query(validadeQuery, [hoje, dataLimite])

      doc.fontSize(16).text("Produtos com Validade Próxima", { underline: true })
      doc.moveDown()

      if (produtosValidade.length === 0) {
        doc.fontSize(12).text("Nenhum produto com validade próxima.")
      } else {
        produtosValidade.forEach(p => {
          doc.fontSize(14).text(`✔ ${p.nome}`)
          doc.fontSize(10).text(`Validade: ${new Date(p.data_validade).toLocaleDateString()} - Qtd: ${p.quantidade}`, { indent: 20 })
          doc.moveDown()
        })
      }
      doc.moveDown()
    }

    if (tipos.includes("Fornecedores")) {
      // Consulta para fornecedores cadastrados no período
      const fornecedoresQuery = `
        SELECT nome, cnpj, created_at as criado_em
        FROM fornecedores
        WHERE created_at BETWEEN $1 AND $2
        ORDER BY created_at
      `
      const { rows: fornecedores } = await pool.query(fornecedoresQuery, [dataInicial, dataFinal])

      doc.fontSize(16).text("Fornecedores", { underline: true })
      doc.moveDown()

      if (fornecedores.length === 0) {
        doc.fontSize(12).text("Nenhum fornecedor encontrado no período.")
      } else {
        fornecedores.forEach(f => {
          doc.fontSize(14).text(`✔ ${f.nome}`)
          doc.fontSize(10).text(`CNPJ: ${f.cnpj} - Cadastro: ${new Date(f.criado_em).toLocaleDateString()}`, { indent: 20 })
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