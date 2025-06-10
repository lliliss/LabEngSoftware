const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
  console.log('Token recebido:', req.headers.authorization);
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('Nenhum token fornecido');
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  try {
    console.log('Verificando token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erro na verificação do token:', error.message);
    return res.status(401).json({ 
      erro: 'Token inválido ou expirado.',
      detalhes: error.message
    });
  }
}
module.exports = authMiddleware