var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".startGameButton").click(function () {
  $(".startGameButton").hide();
  if (!started) {
    $("#level-title").text("Level: " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Click Start Button to Restart");
    $(".startGameButton").text("Restart Game ");
    $(".startGameButton").show();
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level: " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomColorChooser = buttonColors[randomNumber];
  gamePattern.push(randomColorChooser);

  $("#" + randomColorChooser)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomColorChooser);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(clickedbutton) {
  var sound = new Audio("sounds/" + clickedbutton + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
