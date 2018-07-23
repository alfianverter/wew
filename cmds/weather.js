const Discord = require("discord.js");
const Weather = require("weather-js");

exports.run = async (bot, message, args, prefix) => {
      Weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) { 
          if (err) message.channel.send(err);

          if (result.length === 0) {
              message.channel.send(`:x: | **Usage :** ${prefix}weather <location>`) 
              return; 
          }
          var current = result[0].current;
          var location = result[0].location;

          var embed = new Discord.RichEmbed()
              .setDescription(`**${current.skytext}**`)
              .setAuthor(`Weather for ${current.observationpoint}`) 
              .setThumbnail(current.imageUrl)
.setColor("#ec0000")
          .addField('Timezone',`UTC${location.timezone}`, true) 
              .addField('Temperature',`${current.temperature}°C`, true)
              .addField('Feels Like', `${current.feelslike}°C`, true)
              .addField('Winds',current.winddisplay, true)
              .addField('Humidity', `${current.humidity}%`, true)
.setFooter('©AVbot | By: Alfian Verter | 2018')
              message.channel.send(embed)
        });
}

exports.help = {
    name: "weather"
}
