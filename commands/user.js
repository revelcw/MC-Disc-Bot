const { SlashCommandBuilder, time } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
require('dotenv').config();

const user = async (interaction) => {
  const user = interaction.options.getUser('user');

  const member = await interaction.guild.members.fetch({
    user,
    withPresences: true,
  });

  const embed = new MessageEmbed()
    .setTitle('User Info')
    .setColor(process.env.COLOR)
    .setThumbnail(user.avatarURL())
    .addField('Username', user.username, true)
    .addField('Discriminator', user.discriminator, true)
    .addField('ID', user.id, false)
    .addField('Created At', time(user.createdAt), false)
    .addField(
      'Status',
      '```\n' + JSON.stringify(member.presence.clientStatus) + '\n```' ??
        'unknown',
      false
    );
  interaction.reply({ embeds: [embed] });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Just a test command to see a user')
    .addUserOption((option) =>
      option.setName('user').setDescription('User to test').setRequired(true)
    ),
  async execute(interaction) {
    await user(interaction);
  },
};
