const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const GIFEncoder = require('gifencoder');
const { createCanvas } = require('canvas');
const can = require('canvas');
const fs = require('fs');
const encoder = new GIFEncoder(320, 240);
// stream the results as they are available into myanimated.gif
encoder.createReadStream().pipe(fs.createWriteStream('bingo.gif'));
 
encoder.start();
encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
encoder.setDelay(100);  // frame delay in ms
encoder.setQuality(10); // image quality. 10 is default.
 
// discord
 client.on("ready", () => {
  console.log("I am ready!");
});
 
client.on("message", (message) => {
  if (message.content.startsWith(config.prefix + "bingo")) {
	let member = message.mentions.members.first();
	let user = message.mentions.users.first();
	console.log("uid " + member.id);
	member.addRole("544082484531298304").catch(console.error);
	console.log("added role");
	console.log("avatar url " + user.avatarURL);
	message.channel.send(member + " Has been B I N G O'd");
	//create gif
	console.log("started function");
	// use node-canvas
	const canvas = createCanvas(320, 240);
	const ctx = canvas.getContext('2d');
	var img = new can.Image();
	var tomb = new can.Image();
	img.src = user.avatarURL;
	tomb.src = "https://seebeyond.space/snippets/assets/bingo/tomb.png";
	img.onload = function() {
		tomb.onload = function() {
			// frame
			ctx.drawImage(img,100,150,100,100);
			ctx.drawImage(tomb,90,-80, 150, 160);
			encoder.addFrame(ctx);
			// frame
			ctx.drawImage(img,100,150,100,100);
			ctx.drawImage(tomb,90,-60, 150, 160);
			encoder.addFrame(ctx);
			// frame
			ctx.drawImage(img,100,150,100,100);
			ctx.drawImage(tomb,90,-40, 150, 160);
			encoder.addFrame(ctx);
			// frame
			ctx.drawImage(img,100,150,100,100);
			ctx.drawImage(tomb,90,-20, 150, 160);
			encoder.addFrame(ctx);
			// frame
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
			encoder.addFrame(ctx);
			encoder.addFrame(ctx);
			encoder.addFrame(ctx);
			encoder.addFrame(ctx);
			 
			encoder.finish();
			message.channel.send(" ", {file: "./bingo.gif"})
		}
	}
  }
});

client.login(config.token);