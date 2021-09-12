const { MessageEmbed, MessageAttachment } = require('discord.js');
const { resolve } = require('../../utils/utils');

module.exports = {
  name: 'youtube',
  description: 'Memer Api Text Image Command',
  aliases: [],
  usage: 'youtube @user [ Text ]',
  permission: ['EMBED_LINKS'],

  async execute(client, message, args) {
    
    if (!args.length) return message.channel.send({ embeds: [
      new MessageEmbed().setColor(client.color.red)
      .setDescription(`**${client.emoji.cross} You need to provide some text!**`)
    ]})
    const meme = 'youtube.png';


    const emojis = client.emoji.loading;
    const tempMsg = await message.channel.send(`${emojis[Math.floor(Math.random()*emojis.length)]}`)

    let user = message.mentions.users.first();
    if (user) args.shift();
    else user = message.author;

    const text = await resolve(message, args)
    const content = text.join(' ');
    const avatar = user.displayAvatarURL({ format: 'png' });
 
    if (!content) {
      tempMsg.delete()
      return message.channel.send({ embeds: [
        new MessageEmbed().setColor(client.color.red)
        .setDescription(`**${client.emoji.cross} You need to provide some text!**`)
      ]})
    }

    const image = await client.memer.youtube(avatar, user.username, content);
    const attachment = new MessageAttachment(image, meme);


    const embed = new MessageEmbed()
    .setColor(client.color.blue())
    .setImage('attachment://' + meme)
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))


    tempMsg.delete()
    return message.channel.send({ embeds: [embed], files: [attachment] })
  }
}