const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authenticateToken = require('../authMiddleware');  // Import the authentication middleware

// Route to post a job (requires authentication)
router.post('/post', authenticateToken, jobController.postJob);

// Route to apply for a job (requires authentication)
router.post('/apply', authenticateToken, jobController.applyForJob);

// Route to get all job listings (for users to view available jobs)
router.get('/', (req, res) => {
  const query = 'SELECT * FROM jobs';
  db.query(query, (err, result) => {
    if (err) return res.status(500).send('Error fetching jobs');
    res.json(result);
  });
});

// Route to get a specific job's details (for job applicants to view more info)
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM jobs WHERE job_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send('Error fetching job details');
    res.json(result);
  });
});

module.exports = router;