const Yup = require('yup');
const connection = require('../../database/connection');

exports.update = async (req, res) => {
  const schema = Yup.object().shape({
    valor: Yup.number()
      .required(),
    descricao: Yup.string()
      .required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Falha na validação.' });
  }

  const { id } = req.params;
  const { valor, descricao } = req.body;

  const users = await connection('users')
    .where('id_user', id)
    .select('*');

  if (users.length === 0) {
    return res.status(400).json({ error: 'Esse usuário não existe.' });
  }

  if (parseInt(users[0].id_user, 10) !== req.userId) {
    return res.status(401).json({ error: 'Acesso negado.' });
  }

  const deposito = await users[0].saldo + valor;

  const saque = deposito - valor;

  let tipo;

  if (deposito >= saque) {
    tipo = 'deposito';
  } else {
    tipo = 'saque';
  }

  await connection('historics')
    .insert({
      descricao,
      tipo,
      data: new Date().toISOString(),
      user_id: req.userId,
    });

  const user = await connection('users')
    .where('id_user', id)
    .update({ saldo: deposito });

  return res.json(user);
};
