const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { username, email, password, role } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password');
    
    User.create({ username, email, password: hashedPassword, role }, (err, result) => {
      if (err) return res.status(500).send('Error creating user');
      res.status(201).send('User registered successfully');
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.getById(email, (err, user) => {
    if (err || !user) return res.status(400).send('Invalid credentials');
    
    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) return res.status(400).send('Invalid credentials');
      
      const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
};
