const Yup = require('yup');
const connection = require('../../database/connection');

exports.update = async (req, res) => {
  const schema = Yup.object().shape({
    value: Yup.number()
      .required(),
    description: Yup.string()
      .required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Falha na validação.' });
  }
  const { id } = req.params;
  const { value, description, type } = req.body;

  const users = await connection('users')
    .where('id_user', id)
    .select('*');

  if (users.length === 0) {
    return res.status(400).json({ error: 'Esse usuário não existe.' });
  }

  if (parseInt(users[0].id_user, 10) !== req.userId) {
    return res.status(401).json({ error: 'Acesso negado.' });
  }

  const deposit = (type === 'deposit')
    ? parseFloat(users[0].balance) + parseFloat(value)
    : parseFloat(users[0].balance) - parseFloat(value);

  await connection('historics')
    .insert({
      description,
      type,
      old_value: users[0].balance,
      additional_value: value,
      amount: deposit,
      date: new Date().toISOString(),
      user_id: req.userId,
    });

  await connection('users')
    .where('id_user', id)
    .update({ balance: deposit });

  return res.json({
    login: users[0].login,
    type,
    old_value: users[0].balance,
    additional_value: parseFloat(value),
    amount: deposit,
  });
};
