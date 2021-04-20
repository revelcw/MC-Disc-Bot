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
    use: 'pogggers',
    desc: 'Test desc',
  },
  server: {
    name: 'Server',
    use: 'Get info on 1Smp server',
    desc: 'Test desc',
  },
};

for (const [key, value] of Object.entries(commands)) {
  const { handler } = require(`./commands/${key}`);
  value.handler = handler;
  console.log(value.handler);
}

const handleMessage = async ({ client, message }) => {
  const words = message.content.slice(prefix.length).split(' ');
  const [cmd, ...args] = words;

  if (message.content.startsWith(prefix) && commands[cmd]) {
    console.log(commands);
    await commands[cmd].handler({ message, cmd, args, color, icon, prefix });
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
