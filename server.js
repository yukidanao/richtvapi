require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT
const apikey = process.env.MOVIEKEY
const movieRoutes = require('./routes/movieRouter');
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use('/api/movies', movieRoutes);

app.listen(port, () => {
    console.log(`Connected to port ${port}`)
})