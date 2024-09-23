const ConfirmacaoService = require('./confirmacaoService');

module.exports = async (req, res) => {
    const service = new ConfirmacaoService();
    const confirmations = await service.getAllConfirmations();
    res.status(200).json(confirmations);
};
