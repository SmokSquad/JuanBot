const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');


const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
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

client.login(token);

