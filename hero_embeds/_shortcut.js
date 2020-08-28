const Discord = require("discord.js");
const { ana } = require("../hero_embeds/ana_embed");
const { ashe } = require("../hero_embeds/ashe_embed");
const { baptiste } = require("../hero_embeds/baptiste_embed");

function embed_hero(hero, stats) {
  if (["ana"].includes(hero)) return ana(stats);
  if (["ashe", "ash"].includes(hero)) return ashe(stats);
  if (["baptiste", "bap"].includes(hero)) return baptiste(stats);
  if (["bastion", "bas"].includes(hero)) console.log(hero);
  if (["brigitte", "brig"].includes(hero)) console.log(hero);
  if (["dva", "d.va"].includes(hero)) console.log(hero);
  if (["doomfist", "doom"].includes(hero)) console.log(hero);
  if (["echo"].includes(hero)) console.log(hero);
  if (["genji"].includes(hero)) console.log(hero);
  if (["hanzo"].includes(hero)) console.log(hero);
  if (["junkrat", "junk"].includes(hero)) console.log(hero);
  if (["lucio", "frog"].includes(hero)) console.log(hero);
  if (["mccree", "cree"].includes(hero)) console.log(hero);
  if (["mei"].includes(hero)) console.log(hero);
  if (["mercy"].includes(hero)) console.log(hero);
  if (["moira"].includes(hero)) console.log(hero);
  if (["orisa"].includes(hero)) console.log(hero);
  if (["pharah"].includes(hero)) console.log(hero);
  if (["reaper"].includes(hero)) console.log(hero);
  if (["reinhardt", "rein"].includes(hero)) console.log(hero);
  if (["roadhog", "hog"].includes(hero)) console.log(hero);
  if (["sigma", "sig"].includes(hero)) console.log(hero);
  if (["soldier", "soldier76", "legs"].includes(hero)) console.log(hero);
  if (["sombra"].includes(hero)) console.log(hero);
  if (["symmetra", "sym"].includes(hero)) console.log(hero);
  if (["torbjorn", "torb", "torbjörn"].includes(hero)) console.log(hero);
  if (["tracer"].includes(hero)) console.log(hero);
  if (["widowmaker", "widow"].includes(hero)) console.log(hero);
  if (["winston", "monkey"].includes(hero)) console.log(hero);
  if (["wreckingball", "ball", "hammond"].includes(hero)) console.log(hero);
  if (["zarya", "zar"].includes(hero)) console.log(hero);
  if (["zenyatta", "zen"].includes(hero)) console.log(hero);
}
module.exports = {
  embed_hero,
};
