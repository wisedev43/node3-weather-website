const request = require('request');

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoiamlubGVlNDMiLCJhIjoiY2p0M2pueXN5MDJlZDRhcGg2Njdma3R6YSJ9.QURgGXPOdjrYluwP_01-fQ'

	request({url, json: true}, (error, { body }) => {
		if (error) {
			callback('Unable to connect to the location service!', undefined);
		}
		else if (body.features.length === 0) {
			callback('Unable to find the location. Try another search.', undefined);
		}
		else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			})
		}
	})
}

module.exports = geocode;
