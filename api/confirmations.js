const ConfirmacaoService = require('./api/confirmacaoService'); // Corrigido o caminho

module.exports = async (req, res) => {
    try {
        const service = new ConfirmacaoService();
        const confirmations = await service.getAllConfirmations();
        res.status(200).json(confirmations);
    } catch (error) {
        console.error('Erro ao obter confirmações:', error);
        res.status(500).json({ error: 'Erro ao obter confirmações' });
    }
};
