const express = require('express');
const bodyParser = require('body-parser');
const ConfirmacaoService = require('./ConfirmacaoService');
const app = express();
const port = 3000;

const confirmacaoService = new ConfirmacaoService('./confirmacao_festa.xlsx');

app.use(bodyParser.json());
app.use(express.static('public'));

// Função para validar os dados recebidos
function validateData(name, attendance, drink) {
    if (!name || typeof name !== 'string' || name.trim() === "") {
        return 'Nome inválido';
    }
    if (attendance !== 'Sim' && attendance !== 'Não') {
        return 'Valor de presença inválido';
    }
    if (drink !== 'Sim' && drink !== 'Não') {
        return 'Valor de bebida inválido';
    }
    return null;
}

// Rota para receber dados do formulário
app.post('/submit', (req, res) => {
    const { name, attendance, drink } = req.body;

    // Validação dos dados
    const error = validateData(name, attendance, drink);
    if (error) {
        return res.status(400).json({ message: error });
    }

    // Verificar se o nome já existe
    if (confirmacaoService.isDuplicateName(name)) {
        return res.status(400).json({ message: 'Esse nome já foi usado para confirmar presença.' });
    }

    // Adiciona os dados à planilha
    confirmacaoService.addConfirmation({
        Nome: name,
        Presença: attendance,
        Bebida: drink,
        'Data e Hora': new Date().toLocaleString()
    });

    res.json({ message: 'Confirmação recebida com sucesso!' });
});

// Rota para obter a lista de confirmações
app.get('/confirmations', (req, res) => {
    const confirmations = confirmacaoService.getAllConfirmations();
    res.json(confirmations);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
