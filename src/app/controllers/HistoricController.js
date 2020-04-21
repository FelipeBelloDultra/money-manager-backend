const connection = require('../../database/connection');

exports.index = async (req, res) => {
  const historics = await connection('historics')
    .where('user_id', req.userId)
    .join('users', 'users.id_user', '=', 'historics.user_id')
    .select(['historics.*', 'users.login']);

  return res.json(historics);
};

exports.show = async (req, res) => {
  const { id } = req.params;

  const historics = await connection('historics')
    .where('id_hist', id)
    .select('*');

  if (historics.length === 0) {
    return res.status(400).json({ error: 'Esse histórico não existe.' });
  }

  if (parseInt(historics[0].user_id, 10) !== req.userId) {
    return res.status(401).json({ error: 'Acesso negado.' });
  }

  const historic = await connection('historics')
    .where('id_hist', id)
    .join('users', 'users.id_user', '=', 'historics.user_id')
    .select(['historics.*', 'users.login']);

  return res.json(historic);
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  const historics = await connection('historics')
    .where('id_hist', id)
    .select('*');

  if (historics.length === 0) {
    return res.status(400).json({ error: 'Esse histórico não existe.' });
  }

  if (parseInt(historics[0].user_id, 10) !== req.userId) {
    return res.status(401).json({ error: 'Acesso negado.' });
  }

  await connection('historics')
    .where('id_hist', id)
    .delete();

  return res.send();
};
