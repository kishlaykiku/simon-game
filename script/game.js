let buttonColors = ["red", "blue", "green", "yellow"];

// Patterns
let gamePattern = [];
let userClickedPattern = [];

// For level increment
let level = 0;

// For toggling chance
let blockUser = true;

// Listen to keyboard
$("body").keydown(function(){
    if(level == 0)
    {
        // Call next sequence for the first time
        nextSequence();

        // Next is user's turn
        blockUser = false;
    }
});

// Generate pattern
function nextSequence()
{
    // Randomise the selection between 0~3
    let randomNumber = Math.floor(Math.random() * 4);

    // Chosing a random color with random number from button colors array
    let randomChosenColor = buttonColors[randomNumber];

    // Adding the chosen color to the game pattern
    gamePattern.push(randomChosenColor);

    // Effects and Sounds
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    // Change header text
    $("h1").text("Level " + level);
    // Increase level by 1
    level++;

    // Next is user's turn
    blockUser = false;
}

// Store user click pattern
$(".btn").click(function(){
    if (blockUser == false)
    {
        // Get the id of the color button clicked
        let userChosenColor = this.id;

        // Store the id in an array to generate a sequence
        userClickedPattern.push(userChosenColor);

        // Effects and Sounds
        animatePress(userChosenColor);
        playSound(userChosenColor);

        // Next is computer's turn
        blockUser = true;

        // Delay computer's turn by 1s
        setTimeout(nextSequence, 1000);
    }
});



function checkAnswer(gamePattern, userClickedPattern)
{
    
}


// Effects and Sounds
function playSound(name)
{
    // Create audio object
    let sound = new Audio("./sounds/" + name + ".mp3");

    // Play the sound
    sound.play();
}
function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}