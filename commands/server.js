const fetch = require('node-fetch');
const Discord = require('discord.js');
const server = async ({ message, cmd, args, color, icon }) => {
  const resp = await fetch('https://api.mcsrvstat.us/2/1smp.mc.gg');
  if (resp.ok) {
    const data = await resp.json();
    const playerList = data.players.list
      ? data.players.list.map((player) => `•  ${player}`).join('\n')
      : 'Not Found';
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle('1Smp Minecraft Server Info')
      .setAuthor('1Smp', icon)
      .setDescription('')
      .addFields(
        { name: 'Server IP', value: '1smp.mc.gg' },
        {
          name: 'Server status',
          value: `${data.online ? 'Online' : 'Offline'}`,
        },
        {
          name: 'Online players',
          value: `${
            data.online
              ? `${data.players.online}/${data.players.max}`
              : 'Server Offline'
          }`,
        },
        {
          name: 'Player list',
          value: `${data.online ? playerList : 'Server Offline'}`,
        },
        {
          name: 'MOTD',
          value: `${
            data.online
              ? `${
                  data.motd.clean
                } ([view](${`https://mctools.org/motd-creator?text=${encodeURIComponent(
                  data.motd.raw[0] + data.motd.raw[1].replace('§', '&')
                )}`}))`
              : 'Server Offline'
          }`,
        },
        {
          name: 'Admin list',
          value: '1Mon (Max)',
        }
      );
    message.reply(embed);
  }
};

exports.handler = server;
