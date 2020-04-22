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
    password: Yup.string()
      .required()
      .min(6),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Falha na validação.' });
  }

  const { email, login, password } = req.body;

  const users = await connection('users')
    .where({ email })
    .select('*');

  if (users.length > 0) {
    return res.status(400).json({ error: 'Esse email já esta sendo usado!' });
  }

  const hash = await bcrypt.hash(password, 8);

  await connection('users')
    .insert({
      balance: 0,
      email,
      login,
      password: hash,
    });

  return res.json({ email, login });
};

exports.index = async (req, res) => {
  const users = await connection('users')
    .select('*');

  return res.json(users);
};
