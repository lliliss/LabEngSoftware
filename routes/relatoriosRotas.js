const express = require('express')
const router = express.Router()
const PDFDocument = require('pdfkit')

router.post('/gerar', (req, res) => {
    const { tipos, dataInicial, dataFinal } = req.body

    const doc = new PDFDocument()
    const filename = `relatorio_${Date.now()}.pdf`

    res.setHeader('Content-disposition', `attachment; filename ="${filename}"`)
    res.setHeader('Content-type', 'application/pdf')
    doc.pipe(res)

    doc.fontSize(20).text("Relatório - PharmaSafe", { align: 'center'})
    doc.moveDown()
    doc.fontSize(12).text(`Período: ${dataInicial} até ${dataFinal}`)
    doc.moveDown()

    tipos.forEach(tipo => {
        doc.fontSize(14).text("✔ ${tipo")
        doc.fontSize(10).text("Dados simulados...", {indent: 20})
    });

    doc.end()
})

module.exports = router