const db = require('../config/db');

const User = {
  create: (userData, callback) => {
    const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [userData.username, userData.email, userData.password, userData.role], callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM users WHERE user_id = ?';
    db.query(query, [id], callback);
  },
};

module.exports = User;
