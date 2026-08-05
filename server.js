require('dotenv').config();
const express = require('express');
const app = express();
const movieRoutes = require('./routes/movieRouter');
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use('/api/movies', movieRoutes);

app.get('/', (req, res) => res.status(200).send('Movie API is running'));

module.exports = app;

// Only start a local server when not running on Vercel serverless
if (process.env.VERCEL !== '1') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Connected to port ${port}`)
    })
}