const Discord = require("discord.js");
const { get_data } = require("../utils/data_request");
const { user_parse } = require("../utils/parse_username");
const { embed_hero } = require("../hero_embeds/_shortcut");

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
  const emb = embed_hero(hero, stats);

  let d = new Date();
  let n = d.getTime();
  emb.setFooter(`Response time: ${Math.abs(n - message.createdTimestamp)}ms`);

  temp.edit(message.author, emb);
};

module.exports.help = {
  name: "hero",
  aliases: ["heroes", "h"],
};
