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
    const linha = `${email},${password}\n`; // Formata a linha a ser escrita no arquivo
    fs.appendFile('utilizadores.txt', linha, (err) => { // Adiciona a linha ao arquivo usuarios.txt
        if (err) {
            return res.status(500).json({ message: 'Erro ao registrar utilizador' }); // Retorna erro se houver problema ao escrever no arquivo
        }
        res.status(201).json({ message: 'Utilizador registrado com sucesso' }); // Retorna sucesso
    });

});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`); // Informa que o servidor está rodando
});

