const jwt = require('jsonwebtoken');

const connection = require('../../database/connection');
const authConfig = require('../../config/auth');
const { checkPassword } = require('../../utils/checkPassword');

exports.store = async (req, res) => {
  const { email, senha } = req.body;

  const users = await connection('users')
    .where({ email })
    .select('*');

  if (users.length === 0) {
    return res.status(400).json({ error: 'Usuário não existe!' });
  }

  if (!(await checkPassword(senha, users[0].senha))) {
    return res.status(400).json({ error: 'Senha incorreta!' });
  }

  const id = users[0].id_user;

  return res.json({
    user: {
      id: users[0].id_user,
      login: users[0].login,
      email: users[0].email,
    },
    access_token: jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    }),
  });
};
