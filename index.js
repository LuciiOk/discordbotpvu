const coingecko = require('coingecko-api');
const Discord = require('discord.js');
require('dotenv').config();

const coinClient = new coingecko();
const client = new Discord.Client({
    intents: 'GUILD_PRESENCES'
});

const coins = async () => {
    let pvu = 'plant-vs-undead-token';
    let data = await coinClient.simple.price({
        ids: pvu,
        vs_currencies: ['usd', 'clp'],
        include_24hr_change: true
    });
    return data.data['plant-vs-undead-token'];
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    coins().then(value => {
        client.user.setActivity(`1 PVU ➟ ${value.usd} 
        USD$`)
        console.log(value)
    })
    setInterval(() => {
        coins().then(value => {
            client.user.setActivity(`1 PVU ➟ ${value.usd} 
            USD$`)
            console.log(value)
        })
    }, 60000);
});

client.login(process.env.CLIENT_TOKEN);

