const Discord = require("discord.js");
const { get_data } = require("../utils/data_request");
const { user_parse } = require("../utils/parse_username");

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
  if (args.length < 2) {
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

  const temp = await message.channel.send("searching!");

  let username;
  if (!platforms.includes(platform)) {
    await temp.edit(`${platform} is not a valid platform.`);
    return;
  }

  args.shift();

  if (["xbox", "xbl"].includes(platform)) platform = "xbl";
  if (["playstation", "psn"].includes(platform)) platform = "psn";
  if (["nintendo-swicth", "nintendo", "switch"].includes(platform))
    platform = "nintendo-swicth";

  username = user_parse(args, platform);

  const x = await get_data(username, platform);
  let stats;

  // If null, we couldn't find the user.
  if (x != null) stats = await x.json();
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

  const emb = new Discord.MessageEmbed()
    .setAuthor(stats.name, overwatchIcon)
    .setThumbnail(stats.icon)
    .setColor(0xfa9c1d);

  // Top fields
  emb
    .addField("Account level", stats.prestige * 100 + stats.level, true)
    .addField("Endorsement", stats.endorsement, true);

  if (stats.private == true) {
    emb.setDescription(
      "This profile is private.\n" +
        "To unprivate go to Options > Social > Carrer Profile Visibility [Public]."
    );
  } else {
    // Make sure we have other ranks before calculating flex rank.
    if (stats.ratings != null) {
      emb.addField(`\u200b`, "Ratings", false);
      emb.addField(`${roles["flex"]}Average`, getRankIcon(stats.rating), false);

      // For each rank that they have
      for (let i = 0; i < stats.ratings.length; i++) {
        let rolename = stats.ratings[i]["role"];
        emb.addField(
          `${roles[rolename]} ${roleNames[rolename]}`,
          getRankIcon(stats.ratings[i]["level"]),
          true
        );
      }
    } else {
      emb.addField("Ratings", "No ratings to show", false);
    }
  }
  let d = new Date();
  let n = d.getTime();
  emb.setFooter(`Response time: ${Math.abs(n - message.createdTimestamp)}ms`);

  temp.edit(message.author, emb);
};

module.exports.help = {
  name: "stats",
  aliases: ["stat", "s"],
};
