const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;

// Conexão com o banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'aulaback',
    password: 'ds564',
    port: 5432,
});
app.use(express.json());

//Rota que obtem todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios');
        res.json({
            total: resultado.rowCount,
            usuarios: resultado.rows,
        });
    } catch (error) {
        console.error('Erro ao obter usuários', error);
        res.status(500).json({ message: 'Erro ao obter os usuários' });
    }
});

//Rota que insere usuarios
app.post('/usuarios', async (req, res) => {
    try {
        const { nome, email } = req.body;
        await pool.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2)', [nome, email]);
        res.status(201).send({ mensagem: 'Usuário criado com sucesso! 💋' });
    }   catch (error) {
        console.error('Erro ao criar o usuário', error);
        res.status(500).json({ message: 'Erro ao criar o usuário' });
    }
});

//Rota que deleta um usuario
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'Usuário deletado com sucesso! 💋' });
    } catch (error) {
        console.error('Erro ao deletar o usuário', error);
        res.status(500).json({ message: 'Erro ao deletar o usuário' });
    }
});

//Rota que edita um usuario
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email } = req.body;
        await pool.query('UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3', [nome, email, id]);
        res.status(200).send({ mensagem: 'Usuário atualizado com sucesso! 💋' });
    } catch (error) {
        console.error('Erro ao atualizar o usuário', error);
        res.status(500).json({ message: 'Erro ao atualizar o usuário' });
    }
});

//Get usuário pelo id
app.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if(resultado.rowCount == 0) {
            return res.status(404).json({ message: 'Id não encontrado' });
        }else {
            res.json({
                total: resultado.rowCount,
                usuario: resultado.rows[0],
            });
        }
        res.json({
            total: resultado.rowCount,
            usuario: resultado.rows[0],
        });
    } catch (error) {
        console.error('Erro ao obter o usuário pelo ID', error);
        res.status(500).json({ message: 'Erro ao obter o usuário pelo ID' });
    }
});

//Rota de teste
app.get('/', (req, res) => {
  res.send('A rota está funcionando! ✨💋');
});


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`💋 Servidor rodando na porta ${PORT} 💋`);
});