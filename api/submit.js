const ConfirmacaoService = require('.api/confirmacaoService');

module.exports = async (req, res) => {
    const { name, attendance, drink } = req.body;

    const service = new ConfirmacaoService();

    // Verifica duplicatas
    if (await service.isDuplicateName(name)) {
        return res.status(400).json({ message: 'Esse nome já foi usado para confirmar presença.' });
    }

    // Adiciona a confirmação
    await service.addConfirmation({
        Nome: name,
        Presença: attendance,
        Bebida: drink
    });

    res.json({ message: 'Confirmação recebida com sucesso!' });
};
