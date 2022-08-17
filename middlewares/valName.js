module.exports = (req, res, next) => {
    const BAD_REQUEST = 400;
    const { name } = req.body;

    if (!name) {
      return res.status(BAD_REQUEST).json(
        { message: 'O campo "name" é obrigatório' },
      );
    }

    if (name.length < 3) {
      return res.status(BAD_REQUEST).json(
        { message: 'O "name" deve ter pelo menos 3 caracteres' },
      );
    }

    next();
  };