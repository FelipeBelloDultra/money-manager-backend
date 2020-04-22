const bcrypt = require('bcryptjs');

exports.checkPassword = (password, passwordHash) => bcrypt.compare(password, passwordHash);
