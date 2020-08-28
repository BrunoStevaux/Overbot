const Discord = require("discord.js");
// Numbers with Commas
// 123456789 => 123,456,789
function nwc(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ashe(stats) {
  const overwatchIcon =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/600px-Overwatch_circle_logo.svg.png";

  const emb = new Discord.MessageEmbed()
    .setAuthor(stats.name, overwatchIcon)
    .setThumbnail(stats.icon)
    .setColor(0x6881ac);
  if (stats.competitiveStats.careerStats["ashe"]) {
    const hero = stats.competitiveStats.careerStats["ashe"];

    let playtime = nwc(hero.game.timePlayed || 0);
    let wins = nwc(hero.game.gamesWon || 0);
    let loss = nwc(hero.game.gamesLost || 0);
    let draw = nwc(hero.game.gamesTied || 0);
    let winPercentage = nwc(hero.game.winPercentage || 0);

    let dynamiteAll = nwc(hero.heroSpecific.dynamiteKills || 0);
    let dynamiteMax = nwc(hero.heroSpecific.dynamiteKillsMostInGame || 0);
    let dynamiteAvg = nwc(hero.heroSpecific.dynamiteKillsAvgPer10Min || 0);

    let bobAll = nwc(hero.heroSpecific.bobKills || 0);
    let bobMax = nwc(hero.heroSpecific.bobKillsMostInGame || 0);
    let bobAvg = nwc(hero.heroSpecific.bobKillsAvgPer10Min || 0);

    let heroDamageAll = nwc(hero.combat.heroDamageDone || 0);
    let heroDamageMax = nwc(hero.best.heroDamageDoneMostInGame || 0);
    let heroDamageAvg = nwc(hero.average.heroDamageDoneAvgPer10Min || 0);

    let scopedAccuracy = nwc(hero.heroSpecific.scopedAccuracy || 0);
    let scopedCritAccuracy = nwc(
      hero.heroSpecific.scopedCriticalHitsAccuracy || 0
    );
    let scopedCritAvg = nwc(
      hero.heroSpecific.scopedCriticalHitsAvgPer10Min || 0
    );

    let weaponAccuracy = nwc(hero.combat.weaponAccuracy || 0);

    let deathsAll = nwc(hero.combat.deaths || 0);
    let deathsAvg = nwc(hero.average.deathsAvgPer10Min || 0);

    emb.addField(
      "\u200b",
      `\`Playtime: ${playtime}\`\n\`Winrate:  ${winPercentage} - ${wins}/${loss}/${draw} (win/loss)\``
    );

    emb.addField(
      "Damage",
      `\`Total: ${heroDamageAll}\`\n\`Most:  ${heroDamageMax}\`\n\`Avg:   ${heroDamageAvg}\``,
      true
    );

    emb.addField(
      "Dynamite",
      `\`Total: ${dynamiteAll}\`\n\`Most:  ${dynamiteMax}\`\n\`Avg:   ${dynamiteAvg}\``,
      true
    );

    emb.addField(
      "Bob",
      `\`Total: ${bobAll}\`\n\`Most:  ${bobMax}\`\n\`Avg:   ${bobAvg}\``,
      true
    );

    emb.addField(
      "Critical hits",
      `\`Accuracy: ${scopedCritAccuracy}\`\n\`Average:  ${scopedCritAvg}\``,
      true
    );
    emb.addField(
      "Accuracy",
      `\`Weapon: ${weaponAccuracy}\`\n\`Scoped: ${scopedAccuracy}\`\n`,
      true
    );
    emb.addField(
      "Deaths",
      `\`Total: ${deathsAll}\`\n\`Avg:   ${deathsAvg}\`\n`,
      true
    );
  } else {
    emb.setDescription("NOT FOUND");
  }

  return emb;
}

module.exports = {
  ashe,
};
