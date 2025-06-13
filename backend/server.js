import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/users', async (req, res) => {
  try {
    const userResult = await pool.query('SELECT * FROM users');
    const users = userResult.rows;

    const relationResult = await pool.query('SELECT * FROM followers');
    const relations = relationResult.rows;

    const followersMap = {};
    const followingMap = {};

    for (const { follower_id, following_id } of relations) {
      if (!followersMap[following_id]) followersMap[following_id] = [];
      if (!followingMap[follower_id]) followingMap[follower_id] = [];

      followersMap[following_id].push(follower_id);
      followingMap[follower_id].push(following_id);
    }

    const enrichedUsers = users.map(user => ({
      ...user,
      followers: followersMap[user.id] || [],
      following: followingMap[user.id] || []
    }));

    res.json(enrichedUsers);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: err.message });
  }
});


app.post('/api/users', async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { name, email, phone, date_of_birth, avatar, address, following = [] } = req.body;
    const status = 'active';
    const join_date = new Date().toISOString().split('T')[0];

    const userResult = await pool.query(
      `INSERT INTO users (name, email, phone, date_of_birth, join_date, status, avatar, address)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [name, email, phone, date_of_birth, join_date, status, avatar, address]
    );

    const newUser = userResult.rows[0];
    console.log("New user created:", newUser);

    for (let followId of following) {
      await pool.query(
        'INSERT INTO followers (follower_id, following_id) VALUES ($1, $2)',
        [newUser.id, followId]
      );
    }

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: err.message });
  }
});


app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM followers WHERE follower_id = $1 OR following_id = $1', [id]);

    await pool.query('DELETE FROM users WHERE id = $1', [id]);

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({ error: err.message });
  }
});


app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, date_of_birth, avatar, address, following = [] } = req.body;

    await pool.query(
      `UPDATE users SET name = $1, email = $2, phone = $3, date_of_birth = $4, avatar = $5, address = $6 WHERE id = $7`,
      [name, email, phone, date_of_birth, avatar, address, id]
    );

    await pool.query('DELETE FROM followers WHERE follower_id = $1', [id]);
    for (let followId of following) {
      await pool.query(
        'INSERT INTO followers (follower_id, following_id) VALUES ($1, $2)',
        [id, followId]
      );
    }

    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
