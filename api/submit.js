const ConfirmacaoService = require('.api/confirmacaoService');

module.exports = async (req, res) => {
    const { name, attendance, drink } = req.body;

    const service = new ConfirmacaoService();

    // Validação dos dados
    if (!name || typeof name !== 'string' || name.trim() === "" || 
        (attendance !== 'Sim' && attendance !== 'Não') || 
        (drink !== 'Sim' && drink !== 'Não')) {
        return res.status(400).json({ message: 'Dados inválidos' });
    }

    // Verifica duplicatas
    if (service.isDuplicateName(name)) {
        return res.status(400).json({ message: 'Esse nome já foi usado para confirmar presença.' });
    }

    // Adiciona a confirmação
    service.addConfirmation({
        Nome: name,
        Presença: attendance,
        Bebida: drink,
        'Data e Hora': new Date().toLocaleString()
    });

    res.json({ message: 'Confirmação recebida com sucesso!' });
};
