module.exports = {
	name: 'help',
	description: '!help <?command>, displays general or optionally command specific usage info',
	execute(message, args) {
		var returnString = "";
        
        if (args.length == 0){
            returnString += "Add general help information here\n\n Available commands: !list, !help"
        }else{ //allow args>1, no need to error, just show same info for args=1
            switch(args[0]){
                case 'list':
                    returnString += "!list\n\n Lists playlists in category provided.\n Available arguments/usage: !list <themes | moods | areas>"
                    break;
                case 'help':
                    returnString += "!help\n\n Shows this help information. Available arguments/usage: !help <list | help | play>"
                    break;
                case 'play':
                    returnString += "!play\n\n If no arguments provided: Plays / resumes your last played playlist."
                    break;

                default:

            }
        }
		return returnString;
	},
};