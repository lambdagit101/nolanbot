const { client, PREFIX } = require('../index');
const intervalInMS = 15000;

let index = 0;

setInterval(() => {

    const userCount = client.users.cache.size;
    const guildCount = client.guilds.cache.size;

    const statusMessages = [
        
        { type: 'WATCHING', name: `Hentai | ${PREFIX}help`},
        { type: 'WATCHING', name: `${guildCount} Servers | ${PREFIX}help`},
        { type: 'LISTENING', name: `${userCount} Users | ${PREFIX}help`},
        { type: 'PLAYING', name: `Counter-Strike Global Offensive | ${PREFIX}help`},
        { type: 'WATCHING', name: `CS:GO Pro League | ${PREFIX}help`},
        { type: 'PLAYING', name: `Genshin Impact | ${PREFIX}help`},
        { type: 'WATCHING', name: `lambdaguy101 play Crispy Doom | ${PREFIX}help`},
        { type: 'PLAYING', name: `Geometry Dash | ${PREFIX}help`},
        { type: 'WATCHING', name: `Meme Compilations | ${PREFIX}help`},
        { type: 'LISTENING', name: `Necromantic by Stack | ${PREFIX}help`},
        { type: 'LISTENING', name: `Dancing Polish Cow at 4:00 | ${PREFIX}help`},
        { type: 'LISTENING', name: `https://youtu.be/RtTYQuO1j6w | ${PREFIX}help`}, //I couldn't resist the urge.
        { type: 'PLAYING', name: `AssaultCube | ${PREFIX}help`},
        // Does this last one work? I've commented it out as a safe feature.
        // { type: 'PLAYING', name: `the Matrix | /help'}
    ]

    client.user.setActivity(statusMessages[index]);
    index += 1;
    if (index == statusMessages.length) index = 0;
}, intervalInMS);
