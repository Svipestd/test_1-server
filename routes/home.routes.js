const { Router } = require('express');

const User = require('../models/User');
const auth = require('../middleware/auth.middleware');

const router = Router();

//api/home/:userId
router.get(
  '/home/:userId',
  auth,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' })
      }

      return res.status(200).json({ user })
    } catch (err) {
      return res.status(500).json({ error: 'Что-то пошло не так...' })
    }
  }
)

//api/home/update
router.post(
  '/home/update',
  auth,
  async (req, res) => {
    try {
      const { firstname, lastname, age, city } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          $set: {
            firstname,
            lastname,
            age,
            city,
          }
        },
        { new: true }
      )
      return res.status(200).json({ updatedUser })
    } catch {
      return res.status(500).json({ error: 'Что-то пошло не так...'})
    }
  }
)

module.exports = router;