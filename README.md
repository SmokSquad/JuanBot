# Juan The Bard / Juan Bot

Juan The Bard / JuanBot is a dnd-themed discord music bot. Juan (will soon) allow you to get the perfect background music / ambiance for your dnd session simply by specifying a theme, area, or mood

## Installation

FFMPEG required to stream audio from youtube. For windows, add .exe binaries to your system PATH.

A config.json file containing a custom prefix, a discord bot api token, and a base64 encoded spotify <cliendID:secret> is also required:
```javascript
{
	"prefix": "!",
	"token": "<discord bot API token>",
	"spotifyCreds": "<Base64 spotify_clientID:spotify_clientSecret>"
}
```

Follow standard node install / usage steps:

```bash
cd ./JuanBot
npm install
node index.js
```

## Usage (current)

```python
!help
!help <command>

!list
!list <themes | moods | areas>

!meta <spotify playlist link>

!join - joins voice channel you're in

!youtube <youtube link> - plays youtube audio
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
