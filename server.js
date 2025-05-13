import http from 'http'
import { initDB } from './db.js'
import { registerUser, loginUser } from './auth.js'
import { parseBody } from './utils.js'

const PORT = 5000;

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/register') {
    try {
      const { email, password } = await parseBody(req)
      const result = await registerUser(email, password)
      res.writeHead(result.success ? 201 : 400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(result))
    } catch {
      res.writeHead(500)
      res.end(JSON.stringify({ error: 'Erro interno no servidor.' }))
    }

  } else if (req.method === 'POST' && req.url === '/api/login') {
    try {
      const { email, password } = await parseBody(req)
      const result = await loginUser(email, password)
      res.writeHead(result.success ? 200 : 401, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(result))
    } catch {
      res.writeHead(500)
      res.end(JSON.stringify({ error: 'Erro interno no servidor.' }))
    }

  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

server.listen(PORT, async () => {
  await initDB()
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
