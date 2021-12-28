var gamePattern = [];
var userClickedPattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStart = false;


  $(document).keydown(function(){
    if (gameStart === false) {
    nextSequence();
    $("h1").text("Level " + level);
    gameStart = true;
  }
  });


function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColor[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  return $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  return level;
}

$(".btn").click(function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnwser(userClickedPattern.length-1);
})

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed")
  }, 100);
}

function checkAnwser(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Richtig");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Falsch");
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver(){
  gameStart = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
