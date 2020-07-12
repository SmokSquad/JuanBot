module.exports = {
	name: 'youtube',
	description: 'plays audio through youtube to channel juan is in',
	async execute(message, args) {
        const ytdl = require('ytdl-core');
        if (message.member.voice.channel) {
            //Play youtube audio provided in args down voice dispatcher to channel
            const voiceDispatcher = global.voiceConnection.play(ytdl(args[0], { quality: 'highestaudio', filter: 'audioonly'}));

            voiceDispatcher.on('start', () => {
                console.log('Playing youtube!');
            });

            return `Playing music!!`
        }
	},
};