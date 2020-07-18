module.exports = {
	name: 'spotify',
	description: 'manually grab and return a new spotify auth token',
	execute(message, args){
        const request = require('request-promise');
        const { spotifyCreds } = require('../config.json');

        var options = {
            method: 'POST',
            uri: 'https://accounts.spotify.com/api/token',
            form: {
                'grant_type': 'client_credentials'
            },
            headers: {
                'Authorization': 'Basic '+spotifyCreds
            }
        };

        //initializes promise return, calls request
        return new Promise(msg => {

            request(options)
            .then(function (body) {
                console.log(body);
                msg(body);
            })
            .catch(function (err) {
                msg('error');
            });


        });
        
	},
};