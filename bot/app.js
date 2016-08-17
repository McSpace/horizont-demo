var TelegramBot = require('node-telegram-bot-api');
var schedule = require('node-schedule');
var readline = require('readline');
var bashrss = require("./bashrss");
var Firebase = require("firebase");

var fox = require("./fox");
//var loginBot = require("./loginBot");

// -- init command line ---
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



// ---- Init JOB ---- Clear Fox Tracking at 5:55 (MSK)
var job1 = schedule.scheduleJob('0 55 3 * * *', function(){
    fox.DeleteTracking(function() {
      bot.sendMessage(lastChat, "Tracking Deleted");
    });
  var d = new Date();
  var n = d.toString();
  console.log('Job ' + n);
});





// BurgerNowBot
//var token = '109258817:AAHM26-lrQtgF3IF6xZ5zwTf28g-0LCHVMY';
// FareBot
var token = '128527693:AAE6RpObn2uCnxKrW22hbdtAeAcC1E3JCQU';

var banList = [-51270399, 216763507];
// my id 57787202

var allUsers = [];

var lastChat = 123975744;
// Setup polling way
var bot = new TelegramBot(token, {
  polling: true
});
//console.log('bot:', bot);

//console.log('loginBot:', loginBot);


 // var myFirebaseRef1 = new Firebase("https://blinding-fire-7429.firebaseio.com/botlogin");
/*
 myFirebaseRef1.on('value', function(snapshot) {
   
   var state = snapshot.val();
    console.log("Login new state: " + state);
    
    
    if(state == "sent"){
      
       bot.sendMessage(lastChat, "Попытка входа в ваш аккаунт. Это вы?");
        console.log("lastChat: " + lastChat);
    
    }
   

 });
 
 */   
    

bot.on('message', function(msg) {
  
  if (banList.indexOf(msg.chat.id) > -1) {
    console.log('Pidor detected ', msg.chat.id);
    return;
  }
  
  console.log('==================================');
  //console.log('banList ', banList);
  console.log(' msg.chat.id = ',msg.chat.id,  banList.indexOf(msg.chat.id));

  var chatId = msg.chat.id;
  console.log('bot.on text:', msg.text);
  lastChat = chatId;

  // FOX Command to clear FireBase Tracking node
  if (msg.text.toUpperCase() == 'FOX') {
    bot.sendMessage(chatId, "Deletind Tracking");
    fox.DeleteTracking(function() {
      bot.sendMessage(lastChat, "Deleted");
    });
    
    
  }

  if (msg.text.toUpperCase() == 'Y'  ) {
    //bot.sendMessage(chatId, "Deletind Tracking");
     console.log('SetOk');
   // loginBot.SetOk();
   
    
  }
  
    if (msg.text.toUpperCase() == 'B' || msg.text.toUpperCase() == 'N'  ) {

   // loginBot.SetBlock();
   
    
  }
  
    if (msg.text.toUpperCase() == 'R'  ) {
    
    
  //  loginBot.SetReady();
   
    
  }

  
  
 if (msg.text.toUpperCase() == 'A'  ) {
    //  photo can be: a file path, a stream or a Telegram file_id
    //  var photo = 'cat.png';
    //  bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});

    var txt = bashrss.GetRandomBash();
    console.log(txt);
    bot.sendMessage(chatId, txt);

  }


});

bot.on('/start', function(msg) {
  //console.log('/start', msg);
  var chatId = msg.chat.id;
  lastChat = chatId;

  bot.sendMessage(chatId, '/start ' + msg.from.first_name);
});

bot.on('start', function(msg) {
  console.log('start', msg);
  var chatId = msg.chat.id;
  lastChat = chatId;

  bot.sendMessage(chatId, 'start ' + msg.from.first_name);
});

function random(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

rl.on('line', function(cmd) {

  bot.sendMessage(lastChat, bashrss.GetRandomBash());

});
