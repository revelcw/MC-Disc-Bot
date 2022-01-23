const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
require('dotenv').config();

const formattingTable = {
  l: '1',
  n: '4',
  k: '0',
  m: '0',
  o: '0',
  r: '0',
};

const colorTable = {
  0: '30',
  1: '34',
  2: '32',
  3: '36',
  4: '31',
  5: '35',
  6: '33',
  7: '0',
  8: '30',
  9: '34',
  a: '32',
  b: '36',
  c: '31',
  d: '35',
  e: '33',
  f: '37',
};

const motdToAnsi = (rawMotd) => {
  let currentColor = '37';
  let currentFormat = '0';
  const prefixedMotd = `§r${rawMotd}`;
  const convertedMOTD = prefixedMotd.replaceAll(/§(.)/g, (arg) => {
    const [, code] = [...arg];
    // console.log(code)
    const newColor = colorTable[code];
    if (newColor) {
      currentColor = newColor;
    }
    const newFormat = formattingTable[code];
    if (newFormat) {
      currentFormat = newFormat;
    }

    return `\u001b[${currentFormat};0;${currentColor}m`;
  });
  return convertedMOTD;
};

const formatNumber = (number) => {
  return new Intl.NumberFormat('en-us').format(number);
};

const leftTrimArray = (array) => {
  const minCount = array.reduce((acc, curr) => {
    const prefixedSpaces = curr.match(/^\s*/)[0].length;
    return Math.min(prefixedSpaces, acc);
  }, Infinity);
  return array.map((str) => str.substr(minCount));
};

const server = async (interaction) => {
  const serverIP = interaction.options.getString('server_ip') ?? '1smp.mc.gg';

  const resp = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
  if (resp.ok) {
    const data = await resp.json();

    const isOnMobile =
      !!interaction.member.presence?.clientStatus?.mobile ?? true;

    const formattedMotd = isOnMobile
      ? leftTrimArray(data.motd.clean).join('\n')
      : leftTrimArray(data.motd.raw).map(motdToAnsi).join('\n');
    const embed = new MessageEmbed()
      .setColor(process.env.COLOR)
      .setTitle(`${serverIP} Minecraft Server Info`)
      .addField('Server MOTD', '```ansi\n' + formattedMotd + '\n```')
      .addField(
        'Players',
        `${formatNumber(data.players.online)} / ${formatNumber(
          data.players.max
        )}`,
        true
      )
      .setThumbnail(`https://api.mcsrvstat.us/icon/${serverIP}?size=128`)
      .setFooter({
        text: isOnMobile ? 'Formatted for Mobile' : 'Formatted for Desktop',
      });
    interaction.reply({ embeds: [embed] });
  }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription(
      'Gives you info on the 1smp server, or the server IP you pass in.'
    )
    .addStringOption((option) =>
      option
        .setName('server_ip')
        .setDescription('The server IP (Defaults to 1smp.mc.gg)')
        .setRequired(false)
    ),
  async execute(interaction) {
    await server(interaction);
  },
};
