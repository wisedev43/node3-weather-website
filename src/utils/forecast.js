const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/8328d361331adf9e3cd922df1795030c/' + latitude + ',' + longitude;

	request({url, json:true}, (err, { body }) => {
		if (err) {
			callback('Unable to connect the weather forecasting service!', undefined)
		} else if (body.error) {
			callback(error, undefined)
		} else {
			callback(undefined,
				body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degree out. There is a ' + body.currently.precipProbability + ' % chance of rain.'
			);
		}
	});
}

module.exports = forecast;
