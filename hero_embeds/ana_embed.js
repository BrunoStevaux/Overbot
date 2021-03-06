const Discord = require("discord.js");
// Numbers with Commas
// 123456789 => 123,456,789
function nwc(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ana(stats) {
  const overwatchIcon =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/600px-Overwatch_circle_logo.svg.png";

  const emb = new Discord.MessageEmbed()
    .setAuthor(stats.name, overwatchIcon)
    .setThumbnail(stats.icon)
    .setColor(0x6881ac);
  if (stats.competitiveStats.careerStats["ana"]) {
    const hero = stats.competitiveStats.careerStats["ana"];

    let playtime = nwc(hero.game.timePlayed || 0);
    let wins = nwc(hero.game.gamesWon || 0);
    let loss = nwc(hero.game.gamesLost || 0);
    let draw = nwc(hero.game.gamesTied || 0);
    let winPercentage = nwc(hero.game.winPercentage || 0);

    let healingAll = nwc(hero.assists.healingDone || 0);
    let healingMax = nwc(hero.assists.healingDoneMostInGame || 0);
    let healingAvg = nwc(hero.average.healingDoneAvgPer10Min || 0);

    let sleepAll = nwc(hero.heroSpecific.enemiesSlept || 0);
    let sleepMax = nwc(hero.heroSpecific.enemiesSleptMostInGame || 0);
    let sleepAvg = nwc(hero.heroSpecific.enemiesSleptAvgPer10Min || 0);

    let nanoAll = nwc(hero.heroSpecific.nanoBoostsApplied || 0);
    let nanoMax = nwc(hero.heroSpecific.nanoBoostAssistsMostInGame || 0);
    let nanoAvg = nwc(hero.heroSpecific.nanoBoostAssistsAvgPer10Min || 0);

    let heroDamageAll = nwc(hero.combat.heroDamageDone || 0);
    let heroDamageMax = nwc(hero.best.heroDamageDoneMostInGame || 0);
    let heroDamageAvg = nwc(hero.average.heroDamageDoneAvgPer10Min || 0);

    let scoped = nwc(hero.heroSpecific.scopedAccuracy || 0);
    let unscoped = nwc(hero.heroSpecific.unscopedAccuracy || 0);

    let deathsAll = nwc(hero.combat.deaths || 0);
    let deathsAvg = nwc(hero.average.deathsAvgPer10Min || 0);

    emb.addField(
      "\u200b",
      `\`Playtime: ${playtime}\`\n\`Winrate:  ${winPercentage} - ${wins}/${loss}/${draw} (win/loss)\``
    );

    emb.addField(
      "Healing",
      `\`Total: ${healingAll}\`\n\`Most:  ${healingMax}\`\n\`Avg:   ${healingAvg}\``,
      true
    );

    emb.addField(
      "Sleeps",
      `\`Total: ${sleepAll}\`\n\`Most:  ${sleepMax}\`\n\`Avg:   ${sleepAvg}\``,
      true
    );

    emb.addField(
      "Nano",
      `\`Total: ${nanoAll}\`\n\`Most:  ${nanoMax}\`\n\`Avg:   ${nanoAvg}\``,
      true
    );

    emb.addField(
      "Damage",
      `\`Total: ${heroDamageAll}\`\n\`Most:  ${heroDamageMax}\`\n\`Avg:   ${heroDamageAvg}\``,
      true
    );
    emb.addField(
      "Accuracy",
      `\`Scoped:   ${scoped}\`\n\`Unscoped: ${unscoped}\`\n`,
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
  ana,
};
