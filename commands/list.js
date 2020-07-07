module.exports = {
	name: 'list',
	description: 'Ping!',
	execute(message, args) {
		var returnString = "";
		switch (args[0]){
			case 'themes':
				returnString += 'Themes:';
				break;
			case 'moods':
				returnString += 'Moods:';
				break;
			case 'areas':
				returnString += 'Areas:';
				break;
			default:
				returnString += 'Argument: '+args[0]+' unknown. Available arguments are: <themes | moods | areas>';
		}
		message.channel.send(returnString);
	},
};