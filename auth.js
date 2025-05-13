import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from './db'

const SECRET = "chave_de_seguranca"

export async function registroDeUsuario(email, password) {
    const hash = await bcrypt.hash(password, 10)
    try{
        await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hash])
        return {sucess: true}

    } catch{
        return {sucess: false, error: "Email já cadastrado!"}
    }
}

export async function loginDoUsuario(email, password){
    const result = await pool.query('SELEC * FROM users WHERE email = $1', [email])
    const user = result.rows[0]

    if (!user) return {sucess: false, error: "Usuário não encontrado."}

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return {sucess: false, error: "Senha incorreta."}

    const token = jwt.sign({id: user.id, email: user.email}, SECRET, {expiresIn: '1h'})

    return {sucess: true, token}
}