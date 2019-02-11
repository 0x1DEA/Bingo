exports.run = (client, message, member, [mention, time, tomb, ...nick]) => {
  const adminRole = message.guild.roles.find(role => role.id === config.ownerroleid);
  if (!adminRole)
    return console.log("The required role does not exist.");
  if (!message.member.roles.has(adminRole.id))
    return message.reply("Permission Denied.");
  if (message.mentions.members.size === 0)
    return message.reply("Please mention a user to Bingo");
  if (!message.guild.me.hasPermission("MANAGE_ROLES"))
    return message.reply("I don't have permission to manage roles!");

  let member = message.mentions.members.first();
  let user = message.mentions.users.first();
  if(nick) {
    member.setNickname(nick);
  }
  if(!tomb) {
    console.log('No tomb specified, using default.');
    tomb = "default";
  }
  if(!time) {
    message.reply('You didn\'t set a time');
    return;
  }
  await(member.addRole(config.bingoroleid));
  setTimeout(function(){
    member.removeRole(config.bingoroleid);
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
  var img = new can.Image();
	var tomb = new can.Image();
  img.src = user.avatarURL;
  tomb.src = "https://seebeyond.space/snippets/assets/bingo/tomb.png";

  img.onload = function() {
  	tomb.onload = function() {
  		// frame
  		// draw pfp image first
  		ctx.drawImage(img,100,150,100,100);
  		// draw tomb after so it's on top
  		ctx.drawImage(tomb,90,-80, 150, 160);
  		//add frame to the encoder
  		encoder.addFrame(ctx);
  		// frame
  		// clears canvas of previous frame
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tomb,90,-60, 150, 160);
  		encoder.addFrame(ctx);
  		// frame
  		// don't think I need to repeat myself here
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tomb,90,-40, 150, 160);
  		encoder.addFrame(ctx);
  		// frame
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tomb,90,-20, 150, 160);
  		encoder.addFrame(ctx);
  		// frame
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tomb,90,0, 150, 160);
  		encoder.addFrame(ctx);
  		// frame
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tomb,90,20, 150, 160);
  		encoder.addFrame(ctx);
  		// frame
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tomb,90,40, 150, 160);
  		encoder.addFrame(ctx);
  		// frame
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tomb,90,60, 150, 160);
  		encoder.addFrame(ctx);
  		// frame
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.drawImage(img,100,150,100,100);
  		ctx.drawImage(tomb,90,80, 150, 160);
  		// some more frames to make the end of the gif last longer
  		encoder.addFrame(ctx);
  		encoder.addFrame(ctx);
  		encoder.addFrame(ctx);
  		encoder.addFrame(ctx);
  		// finalize gif
  		encoder.finish();
  		// wait until done
  		setTimeout(function() {message.channel.send(`${member} Has been B I N G O'd for ${ms(time)}`, {file: "./bingo.gif"})}, 3000,)
		}
	}
};
