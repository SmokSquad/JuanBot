module.exports = {
	name: 'join',
	description: '!join makes JuanBot join whatever voice channel the requestor is in',
	async execute(message, args) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            global.voiceConnection = connection;
            return `Joining voice channel: ${message.member.voice.channel.name}`
        }
	},
};