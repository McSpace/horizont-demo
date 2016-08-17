
var request = require('request');
var Iconv = require('iconv').Iconv;
var feed = require("feed-read");

var arrBash = [];
var count=0;


function reLoad() {
  var fromEnc = 'windows-1251';
  var toEnc = 'utf-8';
  var translator = new Iconv(fromEnc, toEnc);

  request({
      url: 'http://bash.im/rss/',
      encoding: null
    },
    function(err, res, body) {
      var xmlRss = translator.convert(body).toString();
      feed.rss(xmlRss, function(err, articles) {
        if (err) throw err;

        console.log("Got rss " + articles[0].link);
        arrBash = articles;

      });

    }
  );


}

function GetRandomBash() {
 
  if (arrBash.length > 0) {
    count++;
    console.log("\n********* " + count + " ********\n\n");
    var rndBash = arrBash[random(0, arrBash.length - 1)].content.replace(/<br>/g,"\n");
   // console.log(rndBash);
    return rndBash;
  }else
  {
    console.log("Not Loaded yet...");
    return "";
  }
}

function random (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

  console.log("GetRando\n mBash");
  
reLoad();
setInterval(reLoad, 15 * 60 * 1000);
//setInterval(function() { console.log(GetRandomBash())}, 10 * 1000);

module.exports.GetRandomBash = GetRandomBash;
