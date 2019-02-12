exports.run = (client, message, [mention, time, tomb, nick]) => {
  const GIFEncoder = require('gifencoder');
  const can = require('canvas')
  const { createCanvas } = require('canvas');
  const fs = require("fs");
  const ms = require('ms')

  var member = message.mentions.members.first();
  var user = message.mentions.users.first();
  const adminRole = message.guild.roles.find(role => role.id === client.config.ownerroleid);
  if (!adminRole)
    return console.log("The required role does not exist.");
  if (!message.member.roles.has(adminRole))
    return message.reply("Permission Denied.");
  if (message.mentions.members.size === 0)
    return message.reply("Please mention a user to Bingo");
  if (!message.guild.me.hasPermission("MANAGE_ROLES"))
    return message.reply("I don't have permission to manage roles!");

  if(nick) {
    member.setNickname(nick)
      .catch(console.error);
  }
  if(!tomb) {
    console.log('No tomb specified, using default.');
    tomb = "default";
  }
  if(!time) {
    message.reply('You didn\'t set a time')
      .catch(console.error);
    return;
  }
  member.addRole(client.config.bingoroleid)
    .catch(console.error);
  setTimeout(function(){
    member.removeRole(client.config.bingoroleid)
      .catch(console.error);
    member.setNickname("")
      .catch(console.error);
  }, ms(time));

  //create gif using node canvas to draw frames
  const encoder = new GIFEncoder(320, 240);
  encoder.createReadStream().pipe(fs.createWriteStream('bingo.gif'));
  encoder.start();
  encoder.setRepeat(0);
  encoder.setDelay(100);  // frame delay in ms
  encoder.setQuality(10);
  const canvas = createCanvas(320, 240);
  const ctx = canvas.getContext('2d');
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  var img = new can.Image();
	var tombimg = new can.Image();
  img.src = user.avatarURL;
  tombimg.src = `https://seebeyond.space/snippets/assets/bingo/${tomb}.png`;

  img.onload = function() {
  	tombimg.onload = function() {
  		// frame
  		// draw pfp image first
  		ctx.drawImage(img,100,150,100,100);
  		// draw tomb after so it's on top
  		ctx.drawImage(tombimg,90,-80, 150, 160);
  		//add frame to the encoder
  		encoder.addFrame(ctx);
  		// frame
  		// clears canvas of previous frame
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tombimg,90,-60, 150, 160);
  		encoder.addFrame(ctx);
  		// frame
  		// don't think I need to repeat myself here
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tombimg,90,-40, 150, 160);
  		encoder.addFrame(ctx);
  		// frame
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tombimg,90,-20, 150, 160);
  		encoder.addFrame(ctx);
  		// frame
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tombimg,90,0, 150, 160);
  		encoder.addFrame(ctx);
  		// frame
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tombimg,90,20, 150, 160);
  		encoder.addFrame(ctx);
  		// frame
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tombimg,90,40, 150, 160);
  		encoder.addFrame(ctx);
  		// frame
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tombimg,90,60, 150, 160);
  		encoder.addFrame(ctx);
  		// frame
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tombimg,90,80, 150, 160);
  		// some more frames to make the end of the gif last longer
  		encoder.addFrame(ctx);
  		encoder.addFrame(ctx);
  		encoder.addFrame(ctx);
  		encoder.addFrame(ctx);
  		// finalize gif
  		encoder.finish();
  		// wait until done
  		setTimeout(function() {message.channel.send(`${member} Has been B I N G O'd for ${ms(ms(time), { long: true })}`, {file: "./bingo.gif"}).catch(console.error)}, 2000,)
		}
	}
};
