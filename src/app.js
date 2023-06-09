const request = require('request')
const geocode = require('./utils/goecode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const port = process.env.PORT || 3000

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'shlomo shwirts'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'shlomo shwirts'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'shlomo shwirts'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'no address provided!'
        })
    }
    geocode(req.query.address, (error, response) => {
        if (error) {
            return res.send({
                error: 'can\'t find the altitude or longitude'
            })
        }
        console.log(response)
        forecast(response, (error, data) => {
            if (error) {
                return res.send({
                    error: 'can\'t find the forecast'
                })
            }
            return res.send({
                Location: response.location,
                temperature: data.temperature,
                weather_descriptions: data.weather_descriptions[0]
            })
        })
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return  res.send( {
            error: 'you need to provided a search parameter!'
        })
    }
    res.send( {
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'shlomo shwirts',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'shlomo shwirts',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
