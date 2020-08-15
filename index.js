

const twit = require('twit');
const fetch = require('node-fetch');


const T = new twit({
  consumer_key: 'CONSUMER_KEY', 
  consumer_secret: 'CONSUMER_SECRET' ,
  access_token: 'ACCESS_TOKEN',
  access_token_secret: 'ACCESS_TOKEN_SECRET',
  timeout_ms: 60*1000,
  strictSSL: true
});


const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=city&appid=API_KEY";


twet();

setInterval(() => {
	twet();
}, 86400000);



function twet() {
	const date = new Date();

	fetch(API_URL)
		.then(res => res.json())
		.then(data => {
			const temp = data.main.temp;
			const celcius = Math.round(temp - 273.15);

			let emoji = '';

			if(celcius <= 18) {
				emoji = '❄️';
			} else if(celcius > 18 && celcius <= 28) {
				emoji = '😎';
			} else if(celcius >= 29) {
				emoji = '🔥';
			}

			const message = `${emoji} | El clima en Cúcuta hoy es de ${celcius}° ${date}. Fuente. https://openweathermap.org/`;


			T.post('statuses/update', { status:message }, function(data) {
			  console.log(data);
			});
		});

}

