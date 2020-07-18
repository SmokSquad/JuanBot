async function execute(message, args) {
    const ytdl = require('ytdl-core');
    const { play } = require('../lib/play-youtube');
    if (message.member.voice.channel) {
        //play using lib/play-youtube
        let retmsg = await play(args[0]);

        //listen for play-youtube to return true (finished)
        return new Promise(msg => {
            if (retmsg){
                msg('Success');
            }else{
                msg('Fail: '+retmsg);
            }
        });
    }
}
module.exports = {
	name: 'youtube',
	description: 'plays audio through youtube to channel juan is in',
    execute,
};