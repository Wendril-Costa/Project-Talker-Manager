module.exports = (req, res, next) => {
    const BAD_REQUEST = 400;
    const { email } = req.body;
    const regexEmail = /\S+@\S+\.\S+/;

    if (!email) {
      return res.status(BAD_REQUEST)
        .json({ message: 'O campo "email" é obrigatório' });
    }

    if (email !== regexEmail) {
      return res.status(BAD_REQUEST)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    
    next();
  };