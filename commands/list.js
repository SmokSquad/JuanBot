module.exports = {
	name: 'list',
	description: '!list',
	execute(message, args) {
		var returnString = "";
		if (args.length == 0){
			args[0] = 'INTERNAL_ERR';
		}
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
			case 'INTERNAL_ERR':
				returnString += '!list requires arguments. Available: !list <themes | moods | areas>'
				break;
			default:
				returnString += 'Argument: '+args[0]+' unknown. Available arguments are: <themes | moods | areas>';
		}
		return returnString;
	},
};