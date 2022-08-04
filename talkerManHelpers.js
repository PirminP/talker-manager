const crypto = require('crypto');

function validEmailInput(mail) {
  const emailRegex = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;
  if (emailRegex.test(mail)) {
    return true;
  }
  return false;
}

function validationEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmailInput(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

function validationPassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

// Research: How to create token in node.js --> https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
function generationToken() {
  const token = crypto.randomBytes(8).toString('hex');
  return { token };
}

module.exports = { validationEmail, validationPassword, generationToken };
