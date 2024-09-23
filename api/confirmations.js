const ConfirmacaoService = require('.api/confirmacaoService');

module.exports = async (req, res) => {
    const service = new ConfirmacaoService();
    const confirmations = await service.getAllConfirmations();
    res.status(200).json(confirmations);
};
