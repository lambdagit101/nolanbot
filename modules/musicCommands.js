const { client, PREFIX } = require('../index'); // Import the client from index.js
const { MessageEmbed } = require('discord.js');
  // test
const queue = new Map();
// This part of code was made by Gabriel Tanner, not me!
client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const serverQueue = queue.get(message.guild.id);

    if (message.content.startsWith(`${PREFIX}play`)) {
        execute(message, serverQueue);
        return;
    } else if (message.content.startsWith(`${PREFIX}skip`)) {
        skip(message, serverQueue);
        return;
    } else if (message.content.startsWith(`${PREFIX}stop`)) {
        stop(message, serverQueue);
        return;
    }
});

async function execute(message, serverQueue) {
    const args = message.content.split(" ");

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send("You need to be in a voice channel to play music!");

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send("No permission!");
    }

    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.title,
        url: songInfo.video_url,
    };

    if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);
        const embed = new MessageEmbed()
            .setTitle("YouTube")
            .setColor(0xff0000)
            .setDescription(`**${song.title}** was added to the queue.`);
        return message.channel.send(embed);
    }
}

function skip(message, serverQueue) {
    if (!message.member.voice.channel) return message.channel.send("You have to be in a voice channel to stop the music!");
    if (!serverQueue) return message.channel.send("There is no song that I can skip!");
    serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
    if (!message.member.voice.channel) return message.channel.send("You have to be in a voice channel to stop the music!");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", (error) => console.error(error));

    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    const embed2 = new MessageEmbed()
        .setTitle("YouTube")
        .setColor(0xff0000)
        .setDescription(`Started playing: **${song.title}**`);
    serverQueue.textChannel.send(embed2);
}
