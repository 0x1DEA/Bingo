// import libraries
const config = require("./config.json");
const GIFEncoder = require('gifencoder');
const { createCanvas } = require('canvas');
const can = require('canvas');
const fs = require('fs');
const Discord = require("discord.js");

const client = new Discord.Client();
const encoder = new GIFEncoder(320, 240);
// stream the results as they are available into bingo.gif
encoder.createReadStream().pipe(fs.createWriteStream('bingo.gif'));
// init encoder
encoder.start();
encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
encoder.setDelay(100);  // frame delay in ms
encoder.setQuality(10); // image quality. 10 is default.
 
// discord start
 client.on("ready", () => {
  console.log("I am ready!");
});

// when a message is sent in chat
client.on("message", (message) => {
  if (message.content.indexOf(config.prefix) !== 0) return;
  // basic command handler splits text into arguments
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
	
  if (command === "bingo") {
	if(message.member.roles.find("id", config.ownerroleid)) {
		// create varibles for the user
		// in this scope, member refers to user as a member of a guild
		// user is just the person as a user of discord
		let member = message.mentions.members.first();
		let user = message.mentions.users.first();
		let nick =  args[1]
		let time =  args[2]
		// set nickname
		member.setNickname(nick);
		// time until bingo wears off (not implemented)
		// add role and send message
		member.addRole(config.bingoroleid).catch(console.error);
		message.channel.send(member + " Has been B I N G O'd");
		
		//create gif using node canvas to draw frames
		const canvas = createCanvas(320, 240);
		const ctx = canvas.getContext('2d');
		// these are our images
		var img = new can.Image();
		var tomb = new can.Image();
		// set variables for the image URLs. Tombstone and user pfp
		img.src = user.avatarURL;
		tomb.src = "https://seebeyond.space/snippets/assets/bingo/tomb.png";
		// when user pfp (img) is done loading
		img.onload = function() {
			// when tomb image is done loading
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
				setTimeout(function() {message.channel.send(" ", {file: "./bingo.gif"})}, 3000,)
			}
		}
	} else {
		message.channel.send("Permission denied.")
	}
  }
});
// discord bot token
client.login(config.token);
