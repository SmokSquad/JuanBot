const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, spotifyCreds } = require('./config.json');
const request = require('request-promise');


const client = new Discord.Client();

//Gather commands from ./commands dir
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	handleSpotify();
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);

	try {
		sendResponse(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Error executing command. Use !list to view available commands and arguments.');
	}

});

async function sendResponse(message, args){
	//Process args
	const commandName = args.shift().toLowerCase();
	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	const msg = await command.execute(message, args); //wait for promise (if there is one)

	message.channel.send(msg);
}

/////
// Function to handle re-authing with the spotify api
// Calls every 14 minutes
/////
async function handleSpotify(){
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

	request(options)
	.then(function (body) {
		global.spotifyToken = JSON.parse(body).access_token; //Set global var with retrieved token
		console.log('Retrieved new spotify token');
		setInterval(handleSpotify, 840000); //Handle 
	})
	.catch(function (err) {
		console.log('Fatal spotify error - Couldnt retrieve auth token. Retrying...');
		handleSpotify();
	});

}

client.login(token);