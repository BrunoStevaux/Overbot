const Discord = require("discord.js");
const { get_data } = require("../utils/data_request");
const { user_parse } = require("../utils/parse_username");
const { ana } = require("../hero_embeds/ana_embed");

const ranks = {
  GRANDMASTER: "<:OBGrandmaster:746782184991621181>",
  MASTER: "<:OBMaster:746782185146810408>",
  DIAMOND: "<:OBDiamond:746782185142616114>",
  PLATINUM: "<:OBPlatinum:746782185151004783>",
  GOLD: "<:OBGold:746782185150742648>",
  SILVER: "<:OBSilver:746782185180233742>",
  BRONZE: "<:OBBronze:746782185067118664>",
};

const roles = {
  flex: "<:OBFlex:746817166447345672>",
  tank: "<:OBTank:746813435261747281>",
  damage: "<:OBSupport:746813435249164308>",
  support: "<:OBDamage:746813435286913134>",
};

const roleNames = {
  tank: "Tank",
  damage: "DPS",
  support: "Support",
};

function getRankIcon(sr) {
  if (sr < 1499) sr = `${ranks.BRONZE} ${sr}`;
  else if (sr < 1999) sr = `${ranks.SILVER} ${sr}`;
  else if (sr < 2499) sr = `${ranks.GOLD} ${sr}`;
  else if (sr < 2999) sr = `${ranks.PLATINUM} ${sr}`;
  else if (sr < 3499) sr = `${ranks.DIAMOND} ${sr}`;
  else if (sr < 3999) sr = `${ranks.MASTER} ${sr}`;
  else if (sr < 5000) sr = `${ranks.GRANDMASTER} ${sr}`;

  return sr;
}

module.exports.run = async (bot, message, args) => {
  const overwatchIcon =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/600px-Overwatch_circle_logo.svg.png";

  // if nothing aside from prefix is provided
  if (args.length < 3) {
    const temp = await message.channel.send("You're missing arguments!");
    return;
  }

  let platform = args[0].toLowerCase();
  const platforms = [
    "xbox",
    "xbl",
    "playstation",
    "psn",
    "nintendo-swtich",
    "nintendo",
    "switch",
    "pc",
  ];

  let hero = args[1].toLowerCase();

  const temp = await message.channel.send("searching!");

  let username;
  if (!platforms.includes(platform)) {
    await temp.edit(`${platform} is not a valid platform.`);
    return;
  }

  args.shift();
  args.shift();

  if (["xbox", "xbl"].includes(platform)) platform = "xbl";
  if (["playstation", "psn"].includes(platform)) platform = "psn";
  if (["nintendo-swicth", "nintendo", "switch"].includes(platform))
    platform = "nintendo-swicth";

  username = user_parse(args, platform);

  const x = await get_data(username, platform);
  let stats;
  if (x != null) {
    stats = await x.json();
  }

  // If null, we couldn't find the user.
  else {
    const emb = new Discord.MessageEmbed()
      .setAuthor(username, overwatchIcon)
      .setDescription("This user could not be found.")
      .setColor("#fa9c1d");
    let d = new Date();
    let n = d.getTime();
    emb.setFooter(`Response time: ${Math.abs(n - message.createdTimestamp)}ms`);

    temp.edit(message.author, emb);
    return;
  }
  let emb;

  if (["ana"].includes(hero)) {
    emb = ana(stats);
  }

  if (["ashe", "ash"].includes(hero)) {
    console.log(hero);
  }

  if (["baptiste", "bap"].includes(hero)) {
    console.log(hero);
  }

  if (["bastion", "bas"].includes(hero)) {
    console.log(hero);
  }

  if (["brigitte", "brig"].includes(hero)) {
    console.log(hero);
  }

  if (["dva", "d.va"].includes(hero)) {
    console.log(hero);
  }

  if (["doomfist", "doom"].includes(hero)) {
    console.log(hero);
  }

  if (["echo"].includes(hero)) {
    console.log(hero);
  }

  if (["genji"].includes(hero)) {
    console.log(hero);
  }

  if (["hanzo"].includes(hero)) {
    console.log(hero);
  }

  if (["junkrat", "junk"].includes(hero)) {
    console.log(hero);
  }

  if (["lucio", "frog"].includes(hero)) {
    console.log(hero);
  }

  if (["mccree", "cree"].includes(hero)) {
    console.log(hero);
  }

  if (["mei"].includes(hero)) {
    console.log(hero);
  }

  if (["mercy"].includes(hero)) {
    console.log(hero);
  }

  if (["moira"].includes(hero)) {
    console.log(hero);
  }

  if (["orisa"].includes(hero)) {
    console.log(hero);
  }

  if (["pharah"].includes(hero)) {
    console.log(hero);
  }

  if (["reaper"].includes(hero)) {
    console.log(hero);
  }

  if (["reinhardt", "rein"].includes(hero)) {
    console.log(hero);
  }

  if (["roadhog", "hog"].includes(hero)) {
    console.log(hero);
  }

  if (["sigma", "sig"].includes(hero)) {
    console.log(hero);
  }

  if (["soldier", "soldier76", "legs"].includes(hero)) {
    console.log(hero);
  }

  if (["sombra"].includes(hero)) {
    console.log(hero);
  }

  if (["symmetra", "sym"].includes(hero)) {
    console.log(hero);
  }

  if (["torbjorn", "torb", "torbjörn"].includes(hero)) {
    console.log(hero);
  }

  if (["tracer"].includes(hero)) {
    console.log(hero);
  }

  if (["widowmaker", "widow"].includes(hero)) {
    console.log(hero);
  }

  if (["winston", "monkey"].includes(hero)) {
    console.log(hero);
  }

  if (["wreckingball", "ball", "hammond"].includes(hero)) {
    console.log(hero);
  }

  if (["zarya", "zar"].includes(hero)) {
    console.log(hero);
  }

  if (["zenyatta", "zen"].includes(hero)) {
    console.log(hero);
  }

  let d = new Date();
  let n = d.getTime();
  emb.setFooter(`Response time: ${Math.abs(n - message.createdTimestamp)}ms`);

  temp.edit(message.author, emb);
};

module.exports.help = {
  name: "hero",
  aliases: ["heroes", "h"],
};
