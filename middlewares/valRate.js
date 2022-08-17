module.exports = (req, res, next) => {
    const BAD_REQUEST = 400;
    const { talk: { rate } } = req.body;

    if (rate < 1 || rate > 6) {
      return res.status(BAD_REQUEST).json(
        { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
      );
    }

    if (!rate) {
      return res.status(BAD_REQUEST).json(
        { message: 'O campo "rate" é obrigatório' },
      );
    }

    next();
  };