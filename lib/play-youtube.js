module.exports = {
	name: 'youtube',
	description: 'plays audio through youtube to channel juan is in',
	async play(url) {
        const ytdl = require('ytdl-core');
            //Play youtube audio provided in args down voice dispatcher to channel
            return new Promise(state => {
                const voiceDispatcher = global.voiceConnection.play(ytdl(url, { quality: 'highestaudio', filter: 'audioonly'}));
    
                voiceDispatcher.on('start', () => {
                    console.log('Playing youtube!');
                });
                voiceDispatcher.on('finish', () => {
                    console.log('finish');
                    state(true);
                });
            });
            
    },
};