const { prefix } = require('../../config.json');

module.exports.run = async (client, message, args) => {
    if (require('../../config.json').devpass.includes(message.author.id)) {
        try {
              	await eval(args.join(' '));
		message.react(':hamburger:');
        } catch (err) {
              	message.channel.send(`JavaScript error occured: ${err}`);
		console.log(err);
        }
    } else {
       		message.channel.send(`You cannot use this command.`);
    }
};

module.exports.help = {
    name: "dingus",
    description: "Executes raw JavaScript code. People on the 'devpass' list can use this command.",
    aliases: ['gay']
};
