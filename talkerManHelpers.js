const crypto = require('crypto');
const fs = require('fs/promises');

async function getTalkers() {
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf8'));
  return talkers;
}

function validEmailInput(mail) {
  const emailRegex = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;
  return emailRegex.test(mail);
}

function validDateInput(date) {
  const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  return dataRegex.test(date);
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

async function validationToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
}

function validationName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
}

function validationAge(req, res, next) {
  const { age } = req.body;
  if (!age || !Number.isInteger(age)) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
}

function validationTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  if (talk.rate === 0) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!talk.rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  next();
}

function validationWatchedAt(req, res, next) {
  const { talk } = req.body;
  if (!validDateInput(talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
}

function validationRate(req, res, next) {
  const { talk } = req.body;
  if (!talk.rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
}

module.exports = {
  getTalkers, 
  validationEmail, 
  validationPassword,
  generationToken, 
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationWatchedAt,
  validationRate,
};
