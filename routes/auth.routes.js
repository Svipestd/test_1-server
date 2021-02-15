const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config.js');

const User = require('../models/User');

const router = Router();

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    username: user.username,
    email: user.email
  },
    jwtSecret,
    { expiresIn: '1h' }
  )
}

//api/auth/register
router.post(
  '/register',
  async (req, res) => {
    try {
      const { email, username, password } = req.body;

      const isEmailTaken = await User.findOne({ email });
      if (isEmailTaken) {
        return res.status(400).json({ error: { email: 'Email был использован' } })
      }

      const isUsernameTaken = await User.findOne({ username });
      if (isUsernameTaken) {
        return res.status(400).json({ error: { username: 'Такой пользователь сущевствует' } })
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        email: email,
        username: username,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        firstname: '',
        lastname: '',
        age: 0,
        city: '',
      });

      await newUser.save();

      const token = generateToken(newUser)

      res.status(201).json({ username: newUser.username, userId: newUser._id, token });
    } catch (err) {
      res.status(500).json({ error: { general: 'Что-то пошло не так...' } })
    }
  }
)

//api/auth/login
router.post(
  '/login',
  async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ error: { username: 'Пользователь не найден' } })
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ error: { password: 'Неверный пароль ' } })
      }

      let token = generateToken(user);

      res.status(200).json({ username: user.username, userId: user._id, token });

    } catch (err) {
      res.status(500).json({ error: { general: 'Что-то пошло не так...' } });
    }
  }
)

module.exports = router;