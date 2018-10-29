const MarkovChain = require("markovchain");
const fs = require("fs");
const TelegramBot = require("node-telegram-bot-api");
let config = require("./config.js");
const bot = new TelegramBot(config.config.token, { polling: true });
let arrayQuotes = [];
let ranNum;

//Gets every message received and verify them
bot.on("message", msg => {
  let fromId = msg.from.id;
  let receivedMessage = msg.text.toString();
  if (
    fromId == config.config.USER_ID &&
    receivedMessage.trim().indexOf(" ") != -1
  ) {
    console.log(msg.from.username + ": " + receivedMessage);
    arrayQuotes[arrayQuotes.length] = receivedMessage;
    if (arrayQuotes.length >= config.config.MESSAGES_TO_UPDATE) {
      for (let x = arrayQuotes.length; x > 0; --x) {
        fs.appendFile("quotes.txt", arrayQuotes[x] + "\n", function(err) {
          if (err) throw err;
        });
      }
      console.log("------quotes.txt updated!------");
      arrayQuotes.length = 0;
    }
  }
});

//Telegram commands
bot.onText(/\/settings/, msg => {
  let chainCount = fs.readFileSync("chainCount.txt", "utf8");
  bot.sendMessage(msg.chat.id, "Chains created: " + chainCount);
});

bot.onText(/\/ping/, msg => {
  bot.sendMessage(msg.chat.id, "pong");
});

function changeRanNum() {
  ranNum = Math.floor(Math.random() * config.config.MAX_CHAR + 1);
}

let stopCharLim = function(sentence) {
  return sentence.length >= ranNum;
};

bot.onText(/\/chain/, msg => {
  let quotes = new MarkovChain(fs.readFileSync("quotes.txt", "utf8"));
  changeRanNum();
  bot.sendMessage(msg.chat.id, quotes.end(stopCharLim).process());

  //Increase the chain counter
  let chainCount = fs.readFileSync("chainCount.txt", "utf8");
  ++chainCount;
  fs.writeFileSync("chainCount.txt", chainCount, "utf8");
});
