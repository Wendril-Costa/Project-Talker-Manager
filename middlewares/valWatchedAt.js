module.exports = (req, res, next) => {
    const BAD_REQUEST = 400;
    const { talk: { watchedAt } } = req.body;
    const watchedAtRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

    if (!watchedAt) {
      return res.status(BAD_REQUEST).json(
        { message: 'O campo "watchedAt" é obrigatório' },
      );
    }

    if (!watchedAtRegex.test(watchedAt)) {
      return res.status(BAD_REQUEST).json(
        { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
      );
    }

    next();
  };