const Discord = require('discord.js');
const {handleMessage} = require('./handleMessage');
require('dotenv').config()

const client = new Discord.Client();
const prefix = process.env.PREFIX

client.once('ready', () => {
  console.log('1Smp Bot is online!');
});

client.on('message', message => {
  if (!message.author.bot) {
    handleMessage({client, message})
  }
})

client.login(process.env.TOKEN)