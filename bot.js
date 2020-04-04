const discord = require('discord.js');
const client = new discord.Client();

client.on('message', message => {
    if(message.member == null) {
        return;
    }
    if(message.content.toLowerCase() === '&lockdown' && message.member.hasPermission('ADMINISTRATOR')) {
        global.lockdown = !global.lockdown;
        message.channel.send(`Lockdown: ${global.lockdown}.`);
        console.log(`Lockdown state changed to ${global.lockdown} by ${message.member.user.id}.`);
    }
});

module.exports = client;