const coinflip = ({ message, cmd, args, client }) => {
  const outcome = Math.floor(Math.random() * 2) > 0;
  const heads = message.guild.emojis.cache.get('834899759126282350');
  const tails = message.guild.emojis.cache.get('835524292178739201');
  const first = args[0];
  const second = args[1];
  const you = message.author;
  if (args[0] && args[1]) {
    message.reply(
      `${outcome ? heads : tails} You flipped a ${
        outcome ? 'heads' : 'tails'
      }. ${outcome ? first : second} wins!`
    );
  } else if (args[0]) {
    message.reply(
      `${outcome ? heads : tails} You flipped a ${
        outcome ? 'heads' : 'tails'
      }. ${outcome ? first : you} wins!`
    );
  } else {
    message.reply(
      `${outcome ? heads : tails} You flipped a ${outcome ? 'heads' : 'tails'}.`
    );
  }
  // message.reply(`You flipped a ${outcome ? 'heads' : 'tails'}!`);
};
exports.handler = coinflip;
//const someEmoji = client.emojis.cache.get("<Emoji ID>");
