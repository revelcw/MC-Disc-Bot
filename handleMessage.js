const fetch = require('node-fetch');
const { poggers } = require('./commands/poggers');

require('dotenv').config();
const Discord = require('discord.js');
const prefix = process.env.PREFIX;
const color = process.env.COLOR;
const icon = process.env.ICON;

const commands = {
  poggers: {
    name: 'Poggers',
    use: 'poggers [text]',
    desc: 'Agrees with you that is is poggers',
  },
  server: {
    name: 'Server',
    use: 'server',
    desc: 'Get info on the 1Smp server',
  },
  coinflip: {
    name: 'Coin Flip',
    use: 'coinflip [<username>|<username> <username>]',
    desc:
      'Flips a coin. @ a person to flip against you and them. @ two people or things to pick between them',
  },
};

for (const [key, value] of Object.entries(commands)) {
  const { handler } = require(`./commands/${key}`);
  value.handler = handler;
}

const handleMessage = async ({ client, message }) => {
  const words = message.content.slice(prefix.length).split(' ');
  const [cmd, ...args] = words;

  if (message.content.startsWith(prefix) && commands[cmd]) {
    await commands[cmd].handler({
      message,
      cmd,
      args,
      color,
      icon,
      prefix,
      client,
    });
  } else if (message.content.startsWith(prefix) && cmd === 'help') {
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle('Help')
      .setAuthor('1Smp', icon)
      .setDescription('');
    for (const [key, command] of Object.entries(commands)) {
      embed.addFields({
        name: `${command.name} — \`${prefix}${command.use}\``,
        value: command.desc,
      });
    }
    message.reply(embed);
  } else if (message.content.startsWith(prefix) && !commands[cmd]) {
    message.reply(
      `Hmm, I checked my book and I didn\'t find that command... Please try again or use \`${prefix}help\``
    );
  }
  // if (cmd === 'poggers') {
  //   poggers({ message, client });
  // } else if (cmd === 'help') {
  //   const embed = new Discord.MessageEmbed()
  //     .setColor(color)
  //     .setTitle('Help')
  //     .setAuthor('1Smp', icon)
  //     .setDescription('Some description here')
  //     .addFields(
  //       {
  //         name: '`poggers [text]`',
  //         value: 'Agrees with you that it object is, in fact, poggers',
  //       },
  //       { name: 'mc', value: 'Tells you about the 1Smp Minecraft server' },
  //       { name: 'Inline field title', value: 'Some value here' }
  //     );
  //   message.reply(embed);
  // } else if ((cmd === 'ip') | (cmd === 'mc') | (cmd === 'minecraft')) {
  //
  // } else {
  //   message.reply(
  //     `Hmm, I checked my book and I didn\'t find that command... Please try again or use \`${prefix}help\``
  //   );
  // }
};

exports.handleMessage = handleMessage;
