var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;


function nextSequence(event) {
  console.log("inside Function");
  level++;
  $('h1').text("level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  if(level>0){
    $(document).off("keydown");
  }
  userClickedPattern=[];
}
$(".btn").on("click", function() {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  console.log(userClickedPattern);
  console.log(gamePattern);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  console.log("game pattern "+gamePattern);
  console.log("user Clicked "+userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
});
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var colorID = "#" + currentColor;
  $(colorID).addClass("pressed");
  setTimeout(function() {
    $(colorID).removeClass("pressed");
  }, 100);
}
$(document).keydown(nextSequence);
function checkAnswer(index){
  console.log("Value of length "+userClickedPattern[index] === gamePattern[index]);
  if(userClickedPattern[index] === gamePattern[index]){
    console.log("Value of length "+userClickedPattern.length===gamePattern.length);
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);

    }
  }
  else{
    playSound("wrong");
    setTimeout(function(){
      $("h1").text("Game Over! Refresh to play Again");
      $("body").addClass("game-over");
    },100);
    setTimeout(function(){
      location.reload();
    },1000);

  }
}
