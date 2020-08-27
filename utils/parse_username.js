function user_parse(username, platform) {
  if (platform == "pc") {
    x = username[0].replace("#", "-");
    return x;
  }
  if (platform == "psn") {
    return username;
  }
  if (platform == "xbl") {
    if (username.length > 1) return username.join(" ");
    else return username;
  }
  if (platform == "nintendo-switch") {
    if (username.length > 1) return username.join(" ");
    else return username;
  }
}

module.exports = {
  user_parse,
};
