const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const db = require('./db')
const movieRouter = require('./router/movie_router')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

db.on('error', (error) => {
    console.error.bind(console, 'MongoDB connection error: '+error)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'welcome.html'))
})

app.use('/api/movies', movieRouter)

app.listen(PORT, () => console.log(`Server started at post ${PORT}`))