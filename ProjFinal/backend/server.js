const express = require('express'); // Import express para criar o servidor
const cors = require('cors'); // Import cors para permitir requisições de diferentes origens tp rodar noutro endereço
const bodyParser = require('body-parser'); // Converte o corpo da requisição em JSON para outro pedido 
const fs = require('fs'); // Import fs para manipulação de arquivos
const app = express(); // Cria uma instância do aplicativo express
const port = 3000;

app.use(cors()); // Permite requisições de diferentes origens
app.use(bodyParser.json()); // Converte o corpo da requisição em JSON

app.post('/registar', (req, res) => {
    const { email, password } = req.body; // Extrai email e password do corpo da requisição
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' }); // Retorna erro se email ou senha não forem fornecidos
    }
    fs.readFile('utilizadores.txt', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ message: 'Erro ao ler o arquivo' });
        }
        const linhas = data ? data.split('\n') : [];
        const utilizadores = linhas.map(linha => linha.split(','));
        const existeUtilizador = utilizadores.some(utilizador => utilizador[0] === email);
        if (existeUtilizador) {
            return res.status(409).json({ message: 'Email já cadastrado' });
        }
        const linha = `${email},${password}\n`;
        fs.appendFile('utilizadores.txt', linha, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao registrar utilizador' });
            }
            res.status(201).json({ message: 'Utilizador registrado com sucesso' });
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body; // Extrai email e password do corpo da requisição
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' }); // Retorna erro se email ou senha não forem fornecidos
    }
    fs.readFile('utilizadores.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao ler o arquivo' });
        }
        const linhas = data ? data.split('\n') : [];
        const utilizadores = linhas.map(linha => linha.split(','));
        const utilizador = utilizadores.find(utilizador => utilizador[0] === email && utilizador[1] === password);
        if (!utilizador) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }
        res.status(200).json({ message: 'Login bem-sucedido' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`); // Informa que o servidor está rodando
});

