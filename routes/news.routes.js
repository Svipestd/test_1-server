const { Router } = require('express');

const News = require('../models/News');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');

const router = Router();

//api/news/
router.get('/', auth, async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });

    return res.status(200).json({ news })

  } catch (err) {
    return res.status(500).json({ error: "Что-то пошло не так..." })
  }
})

//api/news/create
router.post('/create', auth, async (req, res) => {
  try {
    const { title, text } = req.body;
    const author = await User.findById(req.user.id);

    const newNews = new News({
      title,
      text,
      username: author.username,
      author: req.user.id,
      createdAt: new Date().toISOString()
    });

    await newNews.save();

    return res.status(201).json({ newNews });
  } catch (err) {
    return res.status(500).json({ error: `Что-то пошло не так...` })
  }
})

//api/news/delete
router.delete('/delete', auth, async (req, res) => {
  try {
    const { newsId } = req.body;
    const news = await News.findById(newsId);

    if (news.username === req.user.username) {
      await news.delete();
      return res.status(200).json({ message: 'Успешно удалено'})
    }

  } catch (err) {
    throw new Error({ error: "Что-то пошло не так..." })
  }
})

module.exports = router;