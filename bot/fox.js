var Firebase = require("firebase");


//var allrunners = {"866636021893312":true,"866636021811405":true,"866636028838294":true,"866636021864107":true,"863438022146755":true,"866636021815281":true,"861353024130396":true,"866636021857713":true,"866636028847972":true,"866636028844391":true,"866636021895069":true,"866636028825093":true,"866636021822048":true,"866636021919158":true,"866636021960954":true,"866636021863976":true,"866636021864883":true,"866636021856822":true,"866636021833862":true,"866734021812430":true,"866636028830432":true,"866636021815158":true,"359606065293350":true,"866636021912161":true,"866636021857614":true,"866636021813195":true,"866636020770875":true,"866636021458942":true,"866636021857432":true,"866636021820703":true,"866636021815364":true,"866636028826158":true,"866636021914209":true,"866636021817402":true,"866636021822311":true,"866636028854879":true,"866636021893569":true,"866636021833870":true,"866636021864149":true,"866636021857754":true,"866636021822279":true,"866636028828196":true,"866636028241853":true,"866636028852337":true,"866636021460369":true};
//var runners = {"863438022146755":true,"861353024130396":true,"866734021812430":true,"866636021822279":true,"866636021460369":true};



function DeleteTracking(callback){
   var myFirebaseRef = new Firebase("https://blinding-fire-7429.firebaseio.com/FoxExpress/Tracking");
  console.log ("Deleting...");
  myFirebaseRef.remove();
  console.log ("Deleted");
  
  if (callback){
    callback();
  }
}

 function UpdateRunners() {
  
  var myFirebaseRef = new Firebase("https://blinding-fire-7429.firebaseio.com/Runners/FoxExpress/");
  Object.keys(allrunners).forEach(function(id, index) {
    if (runners.hasOwnProperty(id)) {
      console.log(5 + index + "got " + id);
    }
    else {
      console.log(index + "new " + id);

      var newItem = {};
      newItem[id] = {
        Name: "Курьер " + (5 + index),
        NumId: 5 + index,
        Show: true
      };

      myFirebaseRef.update(newItem);

    }
  });
};

//console.log('Job 1');



module.exports.DeleteTracking = DeleteTracking;

//
/*
myFirebaseRef.child("Runners").once("value", function(snapshot) {
  console.log (snapshot.val());  // Alerts "San Francisco"
  console.log ("ones");
});
*/
/*
myFirebaseRef.child("Tracking").once("value", function(snapshot) {
  console.log (snapshot.key());  // Alerts "San Francisco"
  console.log ("ones");
    /*snapshot.forEach(function(childSnapshot) {
    // key will be "fred" the first time and "barney" the second time
    var key = childSnapshot.key();
    console.log (key);
    // childData will be the actual contents of the child
   // var childData = childSnapshot.val();
  });
  */
//});



/*
myFirebaseRef.child("Runners").on("value", function(snapshot) {
  console.log(snapshot.val());  // Alerts "San Francisco"
   console.log ("on");
});
*/