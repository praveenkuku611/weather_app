const express = require('express');
const app = express();
const path = require('path');
const https = require('https');

app.use(express.urlencoded({ extended: true })); // To parse form data

app.post('/', (req, res) => {
    const cityName = req.body.cityName;
    const apiKey = '5310e3df1f70e353dd3085b0d489c0d2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;

            // Generate HTML content with weather data
            const html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Weather Information</title>
                </head>
                <body>
                    <h1>Weather Information</h1>
                    <p>Temperature: ${temp}°C</p>
                    <p>Description: ${description}</p>
                </body>
                </html>
            `;

            res.send(html);
        });
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
