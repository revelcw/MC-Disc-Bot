const fetch = require('node-fetch')

require('dotenv').config()
const Discord = require('discord.js');
const {prefix, color, icon} = process.env

const handleMessage = async ({client, message}) => {
  const words = message.content.slice(prefix.length).split(" ");
  const [cmd, ...args] = words;
  const embed = (content, title = '') => {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(title)
      .setAuthor('1Smp', icon)
      .setDescription(content)
      .setTimestamp()
    message.reply(exampleEmbed)
  }

  if (!message.content.startsWith(prefix)) {
    return;
  }
  if (cmd === 'poggers') {
    embed(`Ye ${args ? args.join(' ') : 'dat'} so pog right ${message.author}?`)
  } else if (cmd === 'help') {
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle('Help')
      .setAuthor('1Smp', icon)
      .setDescription('Some description here')
      .addFields(
        { name: '`poggers [text]`', value: 'Agrees with you that it object is, in fact, poggers' },
        { name: 'mc', value: 'Tells you about the 1Smp Minecraft server'},
        { name: 'Inline field title', value: 'Some value here'},
      )
    message.reply(embed)
  } else if (cmd === 'ip' | cmd === 'mc' | cmd === 'minecraft') {
    const resp = await fetch('https://api.mcsrvstat.us/2/1smp.mc.gg')
    if (resp.ok) {
      const data = await resp.json()
      const playerList = data.players.list.map((player) => `•  ${player}`).join("\n")
      const existsData = data ? data : 'N/A'
      existsData.hello
      const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('1Smp Minecraft Server Info')
        .setAuthor('1Smp', icon)
        .setDescription('')
        .addFields(
          { name: 'Server IP', value: '1smp.mc.gg' },
          { name: 'Server status', value: `${data.online ? "Online": "Offline"}` },
          { name: 'Online players', value: `${data.online ? `${data.players.online}/${data.players.max}` : 'N/A'}`},
          { name: 'Player list', value: `${data.online ? playerList : 'N/A'}`},
          { name: 'Admin list', value: '1Mon - Max, breadgoglin - Dylan, revelcw - Revel'},
        )
      message.reply(embed)
    }
  } else {
    message.reply(`Hmm, I checked my book and I didn\'t find that command... Please try again or use \`${prefix}help\``)
  }
}

exports.handleMessage = handleMessage;