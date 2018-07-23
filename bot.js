const Discord = require("discord.js");
const superagent = require("superagent");
const weather = require("weather-js");
const economy = require('discord-eco');
const bot = new Discord.Client({disableEveryone: true});
const moment = require("moment");
const momentDurationFormat = require("moment-duration-format");
const fs = require("fs");
const config = require("./config.json");
const figlet = require('figlet');
const Command = require("klasa");
const prefix = require("./config.json");

///DBL API
bot.commands = new Discord.Collection();
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, bot); 


let coins = require("./coins.json");
let xp = require("./xp.json");
let {cooldown} = require("./cooldown.js")
let commandcooldown = cooldown;
let cdseconds = 5;
const { Canvas } = require("canvas-constructor"); // You can't make images without this.
const { resolve, join } = require("path"); // This is to get a font file.
const { Attachment } = require("discord.js"); // This is to send the image via discord.
const { get } = require("snekfetch");
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log('Pinging');
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


bot.on("ready", async () => {
    console.log(`Logged in as : ${bot.user.tag}`);
    console.log(`${bot.user.username} is ready!`)
                
    function randomStatus() {
        let status = [`Windy Lagi Oprasi Aku :3`, `Member Kita: ${bot.users.size.toLocaleString()}`, 'discord.io/MANIAC',]
          let rstatus = Math.floor(Math.random() * status.length);
        bot.user.setActivity(status[rstatus], {type: 'STREAMING', url: "https://www.twitch.tv/verterid"});
    }; setInterval(randomStatus, 20000)
    setInterval(() => {
    dbl.postStats(bot.guilds.size)
  }, 1800000);
});
bot.on("message", async message => {
  
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
	
	let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
	
	if(!prefixes[message.guild.id]){
		prefixes[message.guild.id] = {
			prefixes: config.prefix
			
		};
	}
	let prefix = prefixes[message.guild.id].prefixes;
    
    let msg = message.content.toLowerCase();
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

   if (!msg.startsWith(prefix)) return;
   if (commandcooldown.has(message.author.id)) {
      return message.channel.send(`Please wait **5 seconds** cooldown...`).then(msg => msg.delete(2000));
      }
      commandcooldown.add(message.author.id);
      setTimeout(() => {
        commandcooldown.delete(message.author.id);
      }, 5000);
      
    try {
      let commandFile = require(`./cmds/${cmd}.js`);
      commandFile.run(bot, message, args);
    } catch (e) {
      console.log(e.message)
    } finally {
      console.log(`${message.author.tag} menggunakan perintah ${prefix}${cmd}`);
    }
  });
fs.readdir('./events', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
    });
});
bot.on('message', async (simi2)  => {

    var simikm3 = "nama team";
if(simi2.content.toLowerCase().includes(simikm3)) {
         simi2.channel.send(`
\`\`\`css
Buat para TEAM yang udah daftar kemaren bertanya" apa aja si syaratnya gampang kok lagian ga ngerugikan kalian daftar gratis price full gede nah syaratnya ini doang sih :
1.  STAY DI SERVER MANIAC 
2.  HARUS ADA DI ROOM MABAR ATAU SEMACAMNYA
3.  BAPER OUT/LEAVE AJA
KALO EMANG MASIH BERAT SYARAT INI MENDING BUAT EVENT SENDIRI 
APA BISA SEGEDE INI PRICE'NYA YAA GW JUGA BISA CUMAN DAFTAR DOANG BISA TAPI SYARAT BOSS JALANIN JANGAN KAYA ORANG HAUS HADIAH INTINYA SYARAT ITU DOANG\`\`\`\n\n ${simi2.author}
`)
}
})
bot.on('message', async (simi2)  => {

    var simikm4 = "nama squad";
if(simi2.content.toLowerCase().includes(simikm4)) {
         simi2.channel.send(`
\`\`\`css
Buat para TEAM yang udah daftar kemaren bertanya" apa aja si syaratnya gampang kok lagian ga ngerugikan kalian daftar gratis price full gede nah syaratnya ini doang sih :
1.  STAY DI SERVER MANIAC 
2.  HARUS ADA DI ROOM MABAR ATAU SEMACAMNYA
3.  BAPER OUT/LEAVE AJA
KALO EMANG MASIH BERAT SYARAT INI MENDING BUAT EVENT SENDIRI 
APA BISA SEGEDE INI PRICE'NYA YAA GW JUGA BISA CUMAN DAFTAR DOANG BISA TAPI SYARAT BOSS JALANIN JANGAN KAYA ORANG HAUS HADIAH INTINYA SYARAT ITU DOANG\`\`\`\n\n ${simi2.author}
`)
}
})

bot.on("message", async autoresponder => {
    if(autoresponder.author.bot) return;
    if(autoresponder.channel.type === "dm") return;
      
        let sender = autoresponder.author;
        if (autoresponder.content.startsWith(prefix)) return;
    
    if (autoresponder.content === `<@!${bot.user.id}>`) {
    autoresponder.react('🏮');
    return autoresponder.channel.send(`Hi ${sender},` + ' use this command ``>help`` ')
    }
    
    if (autoresponder.content === `<@${bot.user.id}>`) {
    autoresponder.react('🏮');
    return autoresponder.channel.send(`Hi ${sender},` + ' use this command ``>help`` ')
    }
        
});

bot.on("guildMemberAdd", member => {
	let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
	if (!autorole[member.guild.id]) { // jika tidak ada autorole yang di set, agar tidak error saat ada yang join
		autorole[member.guild.id] = {
			autorole: config.autorole
		};
	}
	var role = autorole[member.guild.id].role;
	if (!role) return; // jika autorole 0 maka akan dihentikan dan tidak menyebabkan error
	member.addRole(role);
});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;

  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });
});
bot.on("guildMemberRemove", async (member, client, message, args, level) => {  
            var namam = member.user.username
            var jadim = namam.length > 12 ? namam.substring(0, 10) + "..." : namam;
            async function createCanvas() {
            var imageUrlRegex = /\?size=2048$/g;
              
            var {body: background} = await superagent.get("https://cdn.discordapp.com/attachments/469157659711635487/470554862443036693/maxresdefault_1.png");
            var {body: avatar} = await superagent.get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));

            return new Canvas(856, 376)
              .addImage(avatar, 100, 50, 256, 256, 128)
      .setColor('#ff0000')
              .setTextFont('50px System')
              .setTextAlign('center')
              .setTextFont('30px Arial')
              .addImage(background, 0, 0, 856, 376)
              .addText("Goodbbye", 260, 325)
              .addText(`${jadim}#${member.user.discriminator}`, 260, 355)
              .addRoundImage(avatar, 135, 10, 256, 256, 128)
              .toBufferAsync();
            }
  var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
 let welcomesetting = JSON.parse(fs.readFileSync("./welcomeonoff.json", "utf8"));
     if (!welcomesetting[member.guild.id]) {
    welcomesetting[member.guild.id] = {
     values: 1
      };
    }
    if(!welcome[member.guild.id]) return;  
    let values = welcomesetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
    var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
    if (!welcome) return;
    let channel = member.guild.channels.get(`${welcome[member.guild.id].nick}`);
    if (!channel) return;
  
            channel.send(`**Selamat Tinggal** ${member} **Jangan Lupa Berkunjung Kembali Ya :) **`)+channel.send(new Discord.Attachment(await createCanvas()));
    }
});
bot.on("guildMemberAdd", async (member, client, message, args, level) => {  
            var namam = member.user.username
            var jadim = namam.length > 12 ? namam.substring(0, 10) + "..." : namam;
            async function createCanvas() {
            var imageUrlRegex = /\?size=2048$/g;

            var {body: background} = await superagent.get(`https://cdn.discordapp.com/attachments/469157659711635487/470554862443036693/maxresdefault_1.png`);
            var {body: avatar} = await superagent.get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));


            return new Canvas(856, 376)
              .addImage(avatar, 100, 50, 256, 256, 128)
      .setColor('#0ae8f1')
              .setTextFont('50px System')
              .setTextAlign('center')
              .setTextFont('30px Arial')
              .addImage(background, 0, 0, 856, 376)
              .addText("Welcome", 260, 325)
              .addText(`${jadim}#${member.user.discriminator}`, 260, 355)
              .addRoundImage(avatar, 135, 10, 256, 256, 128)
              .toBufferAsync();
            }
  var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
 let welcomesetting = JSON.parse(fs.readFileSync("./welcomeonoff.json", "utf8"));
     if (!welcomesetting[member.guild.id]) {
    welcomesetting[member.guild.id] = {
     values: 1
      };
    }
    if(!welcome[member.guild.id]) return;  
    let values = welcomesetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
    var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
    if (!welcome) return;
    let channel = member.guild.channels.get(`${welcome[member.guild.id].nick}`);
    if (!channel) return;
  
            channel.send(`** Selamat Datang** ${member} **Di server Maniac**\n**Kamu member ke ${member.guild.memberCount}**`)+channel.send(new Discord.Attachment(await createCanvas()));
    }
});
bot.on('guildMemberAdd', async member => {
  let guild = member.guild;
  let autonick = JSON.parse(fs.readFileSync("./autonick.json", "utf8"));
  if(!autonick[member.guild.id]) return;
  
   var autonicksetting = JSON.parse(fs.readFileSync("./autonickonoff.json", "utf8"));
    if (!autonicksetting[member.guild.id]) {
     autonicksetting[member.guild.id] = {
      values: 1
      };
    }
  
    var values = autonicksetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
      let newNick = autonick[member.guild.id].nick
      newNick = newNick.replace('{username}', member.user.username)
      member.guild.members.get(`${member.user.id}`).setNickname(newNick)
    }
});

bot.login(process.env.TOKEN);
