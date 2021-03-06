console.log('Client side javascript is loaded.');

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
// 	response.json().then((data) => {
// 		console.log(data);
// 	});
// });


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

message1.textContent = 'Loading......';
message2.textContent = '';

weatherForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const location = search.value;

	fetch('/weather?address='+location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				message1.textContent = data.error;
				//message2.textContent = '';
			} else {
				message1.textContent = data.location;
				message2.textContent = data.weather;
			}
		})
	})
	})