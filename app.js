const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
const { result } = require('lodash')

// express app
const app = express()

// connect to db
const dbURI = 'Your_mongodb_URI'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        // listen for request
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })
// register view engine (ejs)
app.set('view engine', 'ejs')

// 3rd party middlware
app.use(morgan('dev'))
// middlware for static files
app.use(express.static('public'))
// middlware for accepting form data
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.redirect('/blogs')
})
app.get('/about', (req, res) => {
    res.render('about', { title : 'About'})
})
// blog routes 
app.use('/blogs',blogRoutes)

// 404 page
app.use((req, res) => {
    res.render('404', { title : '404'})
})