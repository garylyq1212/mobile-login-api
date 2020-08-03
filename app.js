const express = require('express');
const helmet = require('helmet');

const db = require('./models');
const userRoute = require('./routes/user.js');

const app = express();

app.use(helmet());
app.use(express.json());

// Routes
app.use('/user', userRoute);

const port = 3000;
app.listen(port, async () => {
  try {
    // Connecting to database and create tables if existed
    await db.sequelize.sync();
    console.log('Database connected & Tables created successfully');

    console.log(`Listening on port ${port}`);
  } catch (err) {
    console.error(err);
  }
});
