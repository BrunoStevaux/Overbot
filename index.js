require("dotenv").config();

const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true});
const botconfig = require("./botconfig.json");
const fs = require("fs");



bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

// Read commands folder
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter (f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) {
        console.log("Couldn't find any commands!");
        return;
    }

    jsfile.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        })
    })
})

bot.on("message", async message =>{

    // Set prefix
    let prefix = botconfig.prefix

    // Check channel type
    if(message.author.id === bot.user.id) return;

    //Check prefix, define args & command
    if(!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

    // Run commands

    if(bot.commands.has(cmd)){
        command = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)){
        command = bot.commands.get(bot.aliases.get(cmd));
    }

    try {
        command.run(bot, message, args);
    } catch (e) {
        console.log(e);
        return;
    }
})

bot.on("ready", async() => {
    console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers`);
    bot.user.setActivity(`with ${bot.guilds.cache.size}/100 servers`);

})

bot.login(process.env.TOKEN);