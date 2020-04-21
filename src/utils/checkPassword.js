const bcrypt = require('bcryptjs');

exports.checkPassword = (senha, senhaHash) => bcrypt.compare(senha, senhaHash);
