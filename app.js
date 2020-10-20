const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());

const apps = require('./google-apps');

app.get('/apps', (req, res) => {
    const { search = '', sort, genre } = req.query;

    if(sort) {
        if(!['App', 'Rating'].includes(sort)) {
            return res.status(400).send('Sort must be one of app or rating')
        }
    }

    if(genre) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res.status(400).send('Genre must be on of Action, Puzzle, Strategy, Casual, Arcade, Card')
        }
    }

    let results = apps.filter(app => app.App.toLowerCase().includes(search.toLowerCase()))
    

    if(sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }

    results = apps.filter(app => app.Genres.includes(genre))

    res.json(results)

})

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
})