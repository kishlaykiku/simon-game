let buttonColors = ["red", "blue", "green", "yellow"];

// Patterns
let gamePattern = [];
let userClickedPattern = [];

// For level increment
let level = 0;

// For continuous user input
let count = 0;

// For toggling chance
let blockUser = true;

// Listen to keyboard(For PC)
$("body").keypress(function(){
    if(level == 0)
    {
        // Call next sequence for the first time
        nextSequence();

        // Next is user's turn
        blockUser = false;
    }
});

// Listen to button(For Mobile)
$(".start").click(function(){
    if(level == 0)
    {
        // Call next sequence for the first time
        nextSequence();

        // Next is user's turn
        blockUser = false;

        // Change the start button to reset
        $(".start").text("RESET");
    }
    else
    {
        // On click of the Start(Reset) button refresh the page
        window.location.reload();
    }
});

// Check for pointing devices
function is_touch_enabled() {
    return ( 'ontouchstart' in window ) || 
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}
// If its a touch screen show the start button
if(is_touch_enabled())
{
    $("#level-title").text("Press the Button to Start");
    $(".start").removeClass("hide");
}
else
{
    $("#level-title").text("Press A Key to Start");
}

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
    $("h1").text("Level " + (level+1));

    // Increase level by 1
    level++;

    // Next is user's turn
    blockUser = false;

    // Reset counter
    count = 0;
}

// Store user click pattern
$(".btn").click(function(){
    if (blockUser == false)
    {
        // Get the id of the color button clicked
        let userChosenColor = this.id;

        // Store the id in an array to generate a sequence
        userClickedPattern.push(userChosenColor);

        // Call function to compare user's and computer's input
        checkAnswer(count);

        // Effects and Sounds
        animatePress(userChosenColor);
        playSound(userChosenColor);

        // Increment counter once
        count++;

        // Check if counter is equal to game pattern array length. If it is equal that means it is now computer's turn
        if(count == gamePattern.length)
        {
            // Next is computer's turn
            blockUser = true;

            // Empty the user pattern array
            userClickedPattern = [];

            // Delay computer's turn by 1s
            setTimeout(nextSequence, 1000);
        }
    }
});

// Check for pattern missmatch
function checkAnswer(index)
{
    if(userClickedPattern[index] != gamePattern[index])
    {

        // Reset all declaration to default and start over
        blockUser = true;
        userClickedPattern = [];
        gamePattern = [];
        count = 0;
        level = 0;

        // Effects and Sounds
        sound = new Audio("./sounds/wrong.mp3");
        sound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        // Change the header text on game over
        if(is_touch_enabled())
        {
            $("h1").text("Game Over, Press Reset to Restart");
        }
        else
        {
            $("h1").text("Game Over, Press Any Key to Restart");
        }
    }
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
    // Add pressed class
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed"); // Remove pressed class
    }, 100)
}