const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up static directory
app.use(express.static(publicDirPath))

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res) =>{
    res.render('index', {
        title : 'Weather',
        name : 'Pradeep Khaire'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'Anout Me',
        name : 'Pradeep Khaire'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title : 'Help',
        helpText : 'This is some helpful text',
        name : 'Pradeep Khaire'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Address must be provided!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
               return res.send({error})
            }

            return res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title : '404',
        name : 'Pradeep Khaire',
        error : 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render("pageNotFound", {
        title : '404',
        name : 'Pradeep Khaire',
        error : 'Page not found.'
    })
})
app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})