module.exports = {
	name: 'curl',
	description: 'it curls',
	execute(message, args){
        const request = require('request-promise');
        var returnString = "test";

        var options = {
            uri: (args[0] != null ? args[0] : 'https://postman-echo.com/get'),
            /*qs: { //query strings, key: value
                foo: 'bar'
            },*/
            headers: {
                'User-Agent': 'JuanBot'
            },
            json: true //return response as a json object - thanks request-promise
        };

        //initializes promise return, calls request
        return new Promise(msg => {

            request(options)
            .then(function (body) {
                console.log(body);
                msg(JSON.stringify(body));
            })
            .catch(function (err) {
                msg('error');
            });


        });
        
	},
};