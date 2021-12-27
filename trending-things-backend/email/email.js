const Mailjet = require("node-mailjet").connect(
  "4e4a7fed94334d1cc19f9a7666ecc76c",
  "9c29dbd4a723350ca204d57b612ce0cc"
);

const transport = Mailjet.post("send");

module.exports = transport;
