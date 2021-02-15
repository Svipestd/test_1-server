const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next()
  }

  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    if (!token) {
      res.status(401).json({ error: 'Отсутствует токен'})
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'));
    if(!decoded) {
      res.status(401).json({ error: 'Невалидный токен'})
    }

    req.user = decoded;
    next();

  } catch (err) {
    res.status(401).json({ error: 'Нет авторизации'})
  }

}
