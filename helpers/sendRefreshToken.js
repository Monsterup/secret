exports.sendRefreshToken = (res, token) => {
  res.cookie("jid", token, {
    httpOnly: true
  });
}