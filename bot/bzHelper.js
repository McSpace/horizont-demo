
const Thinking = [
    'хм...',
    'секудну...',
    'сейчас посмотрим...',
    'ого...',
    ];


module.exports.wait = function(){
    return Thinking[Math.floor(Math.random() * Thinking.length)];
};