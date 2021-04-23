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
  face: {
    name: 'Funny face',
    use: 'face',
    desc: 'Replys with a random funny face for your enjoyment (maybe...)',
  },
};

for (const [key, value] of Object.entries(commands)) {
  const { handler } = require(`./commands/${key}`);
  value.handler = handler;
}

const handleMessage = async ({ client, message }) => {
  const words = message.content.slice(prefix.length).split(' ');
  const [cmd, ...args] = words;
  if (!message.author.bot) {
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
      console.log(cmd, commands[cmd]);
      message.reply(
        `Hmm, I checked my book and I didn\'t find that command... Please try again or use \`${prefix}help\``
      );
    }
  }
};

exports.handleMessage = handleMessage;
