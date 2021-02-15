const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoURI } = require('./config.js');

const app = express();

app.use(cors());

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/profile', require('./routes/home.routes'));
app.use('/api/news', require('./routes/news.routes'));

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
  } catch(err) {
    console.log('Server error: ', err.message)
  }
}

start();