const db = require('../config/db');

exports.postJob = (req, res) => {
  const { employer_id, job_title, job_description, location, salary } = req.body;
  const query = 'INSERT INTO jobs (employer_id, job_title, job_description, location, salary) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [employer_id, job_title, job_description, location, salary], (err, result) => {
    if (err) return res.status(500).send('Error posting job');
    res.status(201).send('Job posted successfully');
  });
};

exports.applyForJob = (req, res) => {
  const { user_id, job_id } = req.body;
  const query = 'INSERT INTO applications (user_id, job_id) VALUES (?, ?)';
  db.query(query, [user_id, job_id], (err, result) => {
    if (err) return res.status(500).send('Error applying for job');
    res.status(201).send('Application submitted successfully');
  });
};
