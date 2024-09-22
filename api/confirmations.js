const ConfirmacaoService = require('.confirmacaoService');

module.exports = async (req, res) => {
    const service = new ConfirmacaoService();
    const confirmations = service.getAllConfirmations();
    res.json(confirmations);
};
