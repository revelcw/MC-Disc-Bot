const poggers = ({ message, cmd, args }) => {
  message.reply(`Ye ${args[0] ? args[0] : 'dat'} so poggers`);
};

exports.handler = poggers;
