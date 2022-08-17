module.exports = (req, res, next) => {
    const INTERNAL_SERVER_ERROR = 500;
    const UNAUTHORIZED = 401;

    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
      }

      if (authorization.length !== 16) {
        return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
      }

      return next();
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).end();
    }
  };