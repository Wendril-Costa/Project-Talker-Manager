module.exports = (req, res, next) => {
    const BAD_REQUEST = 400;
    const { talk } = req.body;

    if (!talk) {
      return res.status(BAD_REQUEST).json(
        { message: 'O campo "talk" é obrigatório' },
      );
    }

    next();
  };