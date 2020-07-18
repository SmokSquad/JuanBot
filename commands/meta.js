const request = require('request-promise');
const { play } = require('../lib/play-youtube');
const { spotifyCreds, youtubeKey } = require('../config.json');


//This isn't very efficient atm
//Currently queries youtube for all tracks in playlist at the start
//Not only adds overhead to starting playback
//but means youtube api quota limits are going to be hit VERY quickly (talking 1-2 larger playlists even)
//Better way would be to query for next track after / during previous playback
//'one-by-one'
//TODO ^^

//Also this file is a mess now in it's current state my bad
function getSongs(playlistId){ //Returns array of youtube url's
    var spotMeta = {
        method: 'GET',
        uri: `https://api.spotify.com/v1/playlists/${playlistId}`,
        headers: {
            'Authorization': 'Bearer '+global.spotifyToken
        },
        json: true
    };

    var trackArray = [];
    //initializes promise return, calls request
    return new Promise(songs => {

        //Begin spotify request
        request(spotMeta)

        .then(function (body) {
            if (body.tracks.items.length > 0){
                for (let i = 0; i < body.tracks.items.length; i++){
                    let trackItem = body.tracks.items[i].track;
                    trackArray[i] = {
                        name : trackItem.name,
                        artist : trackItem.artists[0].name
                    };
                }
                return trackArray;
            }
        })

        .then(function(tracks){
                let urlsGathered = [];

                let count = tracks.length;
                function gathered(){
                    count--;
                    if (count <= 0){
                        songs(urlsGathered);
                    }
                }

                for (let i = 0; i < tracks.length; i++){
                    var youtubeSearch = {
                        method: 'GET',
                        uri: `https://www.googleapis.com/youtube/v3/search`,
                        qs: {
                            q: trackArray[i].name + ' ' + trackArray[i].artist,
                            part: 'snippet',
                            maxResults: 1,
                            key: youtubeKey
                        },
                        json: true
                    };
                    console.log(youtubeSearch);
                    request(youtubeSearch)
                    .then(function (body) {
                        let extractedUrl = `https://www.youtube.com/watch?v=${body.items[0].id.videoId}`;
                        console.log(extractedUrl);
                        urlsGathered[i] = extractedUrl;
                        gathered();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                }
        })

        .catch(function (err) {
            console.log(err);
            msg('Playlist link valid, but couldnt retrieve track info from spotify :( ');
        });

    });
}

async function execute(message, args){
    //Requires one argument, the playlist link
    if (args.length < 1 || args == null) return 'Requires one argument. See !help spotify';

    //Lines can be reduced here
    //Use
    const link = args[0];
    const regexPat = /playlist\/(.*)\?/g;
    let matches = regexPat.exec(link);
    let playlistId = '';
    try{
        playlistId = matches[1];
    } catch {
        return 'Valid playlist not found. Please ensure your link is formatted like the following example: https://open.spotify.com/playlist/37i9dQZF1DX6VdMW310YC7?si=ZxHrpUAvRumTU8RK4_iDyA';
    }

    var urlArray = await getSongs(playlistId); 
    console.log(urlArray);
    if (urlArray.length < 1 || urlArray == null){return 'Error fetching songs from youtube';}
    
    for (let i = 0; i < urlArray.length; i++){
        message.channel.send('Playing song'); //Need to add meta here, maybe add urls to trackArray in getSongs() and return that
        let retmsg = await play(urlArray[i]);
        if (retmsg && (i == urlArray.length-1)){ //song finishes and the last song
            return 'Playlist Finished'
        }else if (retmsg){
            message.channel.send('Song finished. Next song');
        }else{
            return 'Fatal error';
        }
    }
}

module.exports = {
	name: 'play',
	description: 'Plays a spotify playlist',
	execute,
};