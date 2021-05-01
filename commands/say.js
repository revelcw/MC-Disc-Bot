const say = ({ message, cmd, args }) => {
  message.channel.send(` ${args[0] ? args.join(' ') : 'What should I say?'}`);
};

exports.handler = say;
