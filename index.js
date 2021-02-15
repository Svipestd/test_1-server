const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/profile', require('./routes/home.routes'));
app.use('/api/news', require('./routes/news.routes'));

const PORT = process.env.PORT || config.get('port');
const MONGODB = config.get('mongoUri');

async function start() {
  try {
    await mongoose.connect(MONGODB, {
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