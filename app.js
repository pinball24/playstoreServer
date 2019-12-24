const express = require('express')
const morgan = require('morgan')
const playstore = require('./playstore')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(morgan('dev'))

app.get('/apps', (req, res) => {
    const {search = "", sort, genres} = req.query

    let results = playstore
        .filter(app => 
            app
                .App 
                .toLowerCase()
                .includes(search.toLowerCase()))

    let genresType = playstore
            .filter(app =>
                app
                    .Genres
                    .includes(genres))

    if(genres) {
        return genresType.sort
    }

    if(genres) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
                .status(400)
                .send('Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, Card')
        }
    }

    if(sort) {
        results
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
            })
    }

    if(sort) {
        if(!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of rating or app')
        }
    }
    res.json(results)
})

module.exports = app