var vision = require('@google-cloud/vision')({
    projectId: "ofdtest-1288",
    keyFilename: 'ofdtest-846655cb807d.json'
});

// Read the text from an image.
var options = {
    //verbose: true,
    imageContext: {
        "languageHints": [
            "ru"
        ]
    }
};



module.exports.TextFromImg = function(img, callback) {

    vision.detectText(img, options, function(err, text) {
        console.log(err);

        if (text[0]) {
            var desc = text[0].split("\n");
            //console.log(desc);
            callback(desc);
        }else{
            callback(['Ничео']);
        }
    });

};