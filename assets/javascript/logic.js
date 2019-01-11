var config = {
  apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
  authDomain: "time-sheet-55009.firebaseapp.com",
  databaseURL: "https://train-db-c4e00.firebaseio.com/",
  storageBucket: "time-sheet-55009.appspot.com"
};
firebase.initializeApp(config);

var database = firebase.database();
// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  var trainArrival = $("#initial-input").val().trim();
  var trainAway = ""

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
    arrival: trainArrival,
    minutesAway: trainAway
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.arrival);
  console.log(newTrain.minutesAway);

  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#initial-input").val("");
  $("#minAway-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var trainArrival = childSnapshot.val().arrival;
  var trainAway = childSnapshot.val().minutesAway;





  var tFrequency = trainFrequency;

    // Time is whatever the user inputs on the form
    var firstTrain = trainArrival;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");


    // Current Time
    var currentTime = moment();


    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
 

    // difftime mod tfreq  --- Time apart (remainder)
    var tRemainder = diffTime % tFrequency;


    // Minute Away
    var nextTrainTime = tFrequency - tRemainder;


    // Next Train
    var nextTrain = moment().add(nextTrainTime, "minutes");


    var nextArrival = moment(nextTrain).format("hh:mm");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(nextTrainTime)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});