
//var tmpPicUrl = 'https://api.telegram.org/file/bot299275246:AAFfx2yhrEuBysEl-UNIfK8gTuqVkPybkaY/photo/file_2.jpg';

var async = require('asyncawait/async');
var await = require('asyncawait/await');

var TelegramBot = require('node-telegram-bot-api');

var gVision = require("./gVision");
var bz = require("./bzHelper");


// BurgerNowBot
//var token = '109258817:AAHM26-lrQtgF3IF6xZ5zwTf28g-0LCHVMY';
// FareBot
var token = '299275246:AAFfx2yhrEuBysEl-UNIfK8gTuqVkPybkaY'; // OfdRuBot
const myChatId = 57787202;

var banList = [-51270399, 216763507];

var allUsers = [];

var lastChat = 123975744;
// Setup polling way
var bot = new TelegramBot(token, {
    polling: true
});


bot.on('message', async(function(msg) {

    if (banList.indexOf(msg.chat.id) > -1) {
        console.log('Pidor detected ', msg.chat.id);
        return;
    }

    console.log('==================================');

    var chatId = msg.chat.id;
    console.log(' msg.chat.id = ', chatId);



    lastChat = chatId;

    // --- TEXT ----
    if (msg.text) {
        console.log('bot.on text:', msg.text);
        bot.sendMessage(chatId, "Пришли мне фото чека");
        return;
    }

    // --- PHOTO ---
    if (msg.photo && msg.photo.length > 0) {

        bot.sendMessage(chatId, bz.wait() );
        const fileId = msg.photo[msg.photo.length - 1].file_id;

        var file = await (bot.getFile(fileId));
        //console.log("await ", file);

        var tmpuri = "https://api.telegram.org/file/bot" + token + "/" + file.file_path;
        //console.log(tmpuri);

        // -- detect ---
        gVision.TextFromImg(tmpuri, function(res) {
            //console.log(res);
            if (res) {
                bot.sendMessage(chatId, res.join('\r\n'));
            }
            else {
                bot.sendMessage(chatId, "Это точно чек?");
            }
            if (myChatId != chatId) {
                bot.sendPhoto(myChatId, file.file_id);
            }
        });

        if (myChatId != chatId) {
            bot.sendMessage(myChatId, "from " + msg.ser.username);
            bot.sendPhoto(myChatId, file.file_id);
        }

    }
}));


/*
bot.on('photo', function(msg) {
  
  if (banList.indexOf(msg.chat.id) > -1) {
    console.log('Pidor detected ', msg.chat.id);
    return;
  }
  
  console.log('======== FOTO ==========================');
  //console.log('banList ', banList);
  console.log(' msg.chat.id = ', msg.chat.id,  banList.indexOf(msg.chat.id));

  var chatId = msg.chat.id;
  console.log('bot.on foto :', msg);
  lastChat = chatId;



  bot.sendMessage(chatId, "Ну ладно");

  var file = bot.getFile(msg.photo[0].file_id);
  
  console.log(file);
  
});
*/

bot.on('/start', function(msg) {
    //console.log('/start', msg);
    var chatId = msg.chat.id;
    lastChat = chatId;

    bot.sendMessage(chatId, 'Привет! Пришли мне фото чека');
});

bot.on('start', function(msg) {
    console.log('start', msg);
    var chatId = msg.chat.id;
    lastChat = chatId;

    bot.sendMessage(chatId, 'Привет. Пришли мне фото чека');
});
