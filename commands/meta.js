module.exports = {
	name: 'meta',
	description: 'query spotify for metadata', //Temporary. This function will be morphed into a spotify-play-through-youtube function
	execute(message, args){
        const request = require('request-promise');
        const { spotifyCreds } = require('../config.json');

        //Requires one argument, the playlist link
        if (args.length < 1 || args == null) return 'Requires one argument. See !help spotify';

        const link = args[0];
        const regexPat = /playlist\/(.*)\?/g;
        let matches = regexPat.exec(link);
        let playlistId = matches[1];

        var options = {
            method: 'GET',
            uri: `https://api.spotify.com/v1/playlists/${playlistId}`,
            headers: {
                'Authorization': 'Bearer '+global.spotifyToken
            },
            json: true
        };
        //initializes promise return, calls request
        return new Promise(msg => {

            request(options)
            .then(function (body) {
                let trackinfo = '';
                if (body.tracks.items.length > 0){
                    for (let i = 0; i < body.tracks.items.length; i++){
                        let trackItem = body.tracks.items[i];
                        trackinfo += `\n - Track: ${trackItem.track.name} by ${trackItem.track.artists[0].name}`;
                    }
                }
                console.log(trackinfo);
                msg(`Playlist: ${body.name} by ${body.owner.display_name}.${trackinfo.slice(0, 1800)}`);
            })
            .catch(function (err) {
                console.log(err);
                msg('error with request');
            });

        }); 
	},
};