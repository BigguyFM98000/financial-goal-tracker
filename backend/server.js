const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/authRoutes');
const goalRoutes = require('./routes/goalRoutes');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/goals', goalRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
});
