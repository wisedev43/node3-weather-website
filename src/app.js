const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Jin Lee'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Jin Lee'
	})
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Jin Lee',
		helpText: 'This is help page.'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'The address for forecasting must be given.'
		});
	}

	geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
		if (err) {
			return res.send({ error: err });
		}
		
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error: error});
			}

			res.send({
				location: location,
				latitude,
				longitude,
				weather: forecastData
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404 - Help',
		name: 'Jin Lee',
		errorMessage: 'Help article not found'
	})
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Jin Lee',
		errorMessage: 'Page not found'
	})
})

app.listen(3100, () => {
	console.log('Sever is up on port 3100.');
});