const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
    if (message.channel.nsfw == true) {
			const args = message.content.slice(PREFIX.length).trim().split(' ');
			var command = args.slice(1, args.length);
			var finalresult = command.join("+");
            const rule34 = await fetch(`https://r34-json-api.herokuapp.com/posts?tags=${finalresult}`);
			const rule34json = await rule34.json();
			const r34embed = new Discord.MessageEmbed()
				.setTitle(`${message.author.username}, here is your requested rule 34`)
				.setColor("BLURPLE")
				.setImage(rule34json[Math.floor(Math.random() * rule34json.length)].file_url)
				.setFooter(`Invoked by ${message.author.username}`, message.author.avatarURL());
			message.channel.send(r34embed);
        }
};

module.exports.help = {
    name: "rule34",
    description: "Searches the rule 34 website with the tags you specify.",
    aliases: ['r34']
};