const Discord = require("discord.js");
// Numbers with Commas
// 123456789 => 123,456,789
function nwc(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function baptiste(stats) {
  const overwatchIcon =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/600px-Overwatch_circle_logo.svg.png";

  const emb = new Discord.MessageEmbed()
    .setAuthor(stats.name, overwatchIcon)
    .setThumbnail(stats.icon)
    .setColor(0x6881ac);
  if (stats.competitiveStats.careerStats["baptiste"]) {
    const hero = stats.competitiveStats.careerStats["baptiste"];

    let playtime = nwc(hero.game.timePlayed || 0);
    let wins = nwc(hero.game.gamesWon || 0);
    let loss = nwc(hero.game.gamesLost || 0);
    let draw = nwc(hero.game.gamesTied || 0);
    let winPercentage = nwc(hero.game.winPercentage || 0);

    let healingAll = nwc(hero.assists.healingDone || 0);
    let healingMax = nwc(hero.assists.healingDoneMostInGame || 0);
    let healingAvg = nwc(hero.average.healingDoneAvgPer10Min || 0);

    let deathsPrevAll = nwc(
      hero.heroSpecific.immortalityFieldDeathsPrevented || 0
    );
    let deathsPrevMax = nwc(
      hero.heroSpecific.immortalityFieldDeathsPreventedMostInGame || 0
    );
    let deathsPrevAvg = nwc(
      hero.heroSpecific.immortalityFieldDeathsPreventedAvgPer10Min || 0
    );

    let ampAll = nwc(hero.heroSpecific.amplificationMatrixCasts || 0);
    let ampMax = nwc(hero.heroSpecific.amplificationMatrixCastsMostInGame || 0);
    let ampAvg = nwc(
      hero.heroSpecific.amplificationMatrixCastsAvgPer10Min || 0
    );

    let heroDamageAll = nwc(hero.combat.heroDamageDone || 0);
    let heroDamageMax = nwc(hero.best.heroDamageDoneMostInGame || 0);
    let heroDamageAvg = nwc(hero.average.heroDamageDoneAvgPer10Min || 0);

    let weaponAcc = nwc(hero.combat.weaponAccuracy || 0);
    let healingAcc = nwc(hero.heroSpecific.healingAccuracy || 0);

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
      "Deaths Prevented",
      `\`Total: ${deathsPrevAll}\`\n\`Most:  ${deathsPrevMax}\`\n\`Avg:   ${deathsPrevAvg}\``,
      true
    );

    emb.addField(
      "Amp Matrix",
      `\`Total: ${ampAll}\`\n\`Most:  ${ampMax}\`\n\`Avg:   ${ampAvg}\``,
      true
    );

    emb.addField(
      "Damage",
      `\`Total: ${heroDamageAll}\`\n\`Most:  ${heroDamageMax}\`\n\`Avg:   ${heroDamageAvg}\``,
      true
    );
    emb.addField(
      "Accuracy",
      `\`Weapon:  ${weaponAcc}\`\n\`Healing: ${healingAcc}\`\n`,
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
  baptiste,
};
