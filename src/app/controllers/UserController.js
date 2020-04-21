const Yup = require('yup');
const bcrypt = require('bcryptjs');
const connection = require('../../database/connection');

exports.store = async (req, res) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    login: Yup.string()
      .required(),
    senha: Yup.string()
      .required()
      .min(6),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Falha na validação.' });
  }

  const { email, login, senha } = req.body;

  const users = await connection('users')
    .where({ email })
    .select('*');

  if (users.length > 0) {
    return res.status(400).json({ error: 'Esse email já esta sendo usado!' });
  }

  const hash = await bcrypt.hash(senha, 8);

  const user = await connection('users')
    .insert({ email, login, senha: hash });

  return res.json(user);
};

exports.index = async (req, res) => {
  const users = await connection('users')
    .select('*');

  return res.json(users);
};
