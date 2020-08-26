const Discord = require("discord.js");
const { get_data } = require("../utils/data_request");

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
  console.log(args);
  if (args.length == 0) {
    const temp = await message.channel.send("You're missing a battletag!");
    return;
  }
  const temp = await message.channel.send("searching!");
  const platforms = ["pc", "xbl", "psn"];

  // Get the json for the profile, if it exists

  //assume we are looking for PC
  let platform = "pc";

  // if user specifies platform
  if (args[0].toLowerCase() == "pc") platform = "pc";
  else if (["xbox", "xbl"].includes(args[0].toLowerCase())) platform = "xbl";
  else if (["playstation", "psn"].includes(args[0].toLowerCase()))
    platform = "psn";

  let battletag;

  //replace Example#0000 with Example-0000
  if (platform == "pc") battletag = args[0].replace("#", "-");

  //XBL usernames can have spaces. "The ultimate one" for example.
  if (platform == "xbl") {
    args.shift();
    battletag = args.join(" ");
  }

  //PSN usernames cannot have spaces.
  if (platform == "psn") battletag = args[1];

  console.log(
    `[Request]\n` +
      `Stats ${battletag}|${platform} from ${message.author.username}#${message.author.discriminator}\n` +
      `Server: ${message.guild} Channel: ${message.channel.name}`
  );

  console.log(`battletag: ${battletag} platform ${platform}`);

  const x = await get_data(battletag, platform);
  let stats;

  // If null, we couldn't find the user.
  if (x != null) stats = await x.json();
  else {
    const emb = new Discord.MessageEmbed()
      .setAuthor(battletag, overwatchIcon)
      .setDescription("This user could not be found.")
      .setColor("#fa9c1d");
    let d = new Date();
    let n = d.getTime();
    emb.setFooter(`Response time: ${n - message.createdTimestamp}ms`);

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
      "This profile is private. To unprivate go to Carrer Profile > Social > Public."
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
  emb.setFooter(`Response time: ${n - message.createdTimestamp}ms`);

  temp.edit(message.author, emb);
};

module.exports.help = {
  name: "stats",
  aliases: ["stat", "s"],
};
