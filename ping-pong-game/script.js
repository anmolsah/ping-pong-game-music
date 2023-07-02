//fetch the ball,toprod,rodbottom elements from the DOM
const ball = document.getElementById('ball');
const rodTop = document.getElementById('rod-top');
const rodBottom = document.getElementById('rod-bottom');
// const bgMusic= document.getElementById('music');
const bgMusic = new Audio();


//fetch the music files from the DOM
const musicFolder = 'music/';
const musicFiles = ['music-1.mp3','music-2.mp3','music-3.mp3','music-4.mp3','music-5.mp3','music-6.mp3','music-7.mp3','music-8.mp3','music-9.mp3','music-10.mp3','music-11.mp3','music-12.mp3','music-13.mp3','music-14.mp3','music-15.mp3','music-16.mp3','music-17.mp3','music-18.mp3','music-19.mp3','music-20.mp3'];

bgMusic.src = musicFolder + musicFiles[0];

//function to play the music
function playBgMusic(){
    bgMusic.play();
}

//function to pause the music
function pauseBgMusic(){
    bgMusic.pause();
}

let currentSongIndex = 0;


//function switch the next song music filesfunction playNextSong(){

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % musicFiles.length;
    bgMusic.src = musicFolder + musicFiles[currentSongIndex];
    bgMusic.play();
  }

//Now we will set the initial position of the ball and the rods
let ballX = 105; //initial horizontal position of the ball
let ballY = 400; //initial vertical position of the ball
let ballSpeedX = 1.5; //ball speed in horizontal direction
let ballSpeedY = -1.5; // ball speed in vertical direction
let rodX = 255; //initial position of the rods in horizontal direction

let scoreTop = 0; //score of the top rod
let scoreBottom = 0; //score of the bottom rod

const rodWidth = rodTop.offsetWidth; // gives the width of the rod
const rodHeight = rodTop.offsetHeight; //gives the height of the rod

//this function will update the position of the ball and rods
function updatePositions(){
    //updating the ball position
    ballX +=ballSpeedX;
    ballY +=ballSpeedY;
    ball.style.left = ballX + 'px';
    ball.style.bottom = ballY + 'px';

    //updating the rod position
    rodX =Math.min(Math.max(0,rodX), window.innerWidth - rodWidth);
    rodTop.style.left = rodX + 'px';
    rodBottom.style.left = rodX + 'px';

    //very important - collison detection with walls

    if(ballX <=0 || ballX + ball.offsetWidth >= window.innerWidth){
        ballSpeedX = -ballSpeedX; //whenever the ball collides with the walls we just reverse the ball direction   
    }

    if(ballY <= rodTop.offsetTop +rodHeight && ballX +ball.offsetWidth >= rodX  && ballX <= rodX + rodWidth){
        ballSpeedY = -ballSpeedY; //whenever the ball collides with top rod we just reverse the ball direction
        scoreTop++;
    }else if(ballY + ball.offsetHeight >= rodBottom.offsetTop && ballX + ball.offsetWidth >= rodX && ballX <= rodX + rodWidth){
        ballSpeedY = -ballSpeedY; //whenever the ball collides with bottom rod we just reverse the ball direction
        scoreBottom++;
    }else if(ballY <= 0 || ballY + ball.offsetHeight >= window.innerHeight){
      endGame(); // ball misses the rod
      return;  
    }

    //update the score 

    document.getElementById('score-top').textContent = scoreTop;
    document.getElementById('score-bottom').textContent = scoreBottom;

}

// function to start the new round 

function startNewRound(){
    //reset the ball position to center
    ballX = window.innerWidth/2 - ball.offsetWidth/2;
    ballY = window.innerHeight/2 - ball.offsetHeight/2;

    //reset the rod position to center

    rodX = window.innerWidth/2 - rodWidth/2;

    // reset the ball speed 
    ballSpeedX = 1.5;
    ballSpeedY = -1.5;
}

//function to reset the game

function resetGame(){
    //reset score
    scoreTop = 0;
    scoreBottom = 0;
     //start new round
     startNewRound();

}

//function to end this game
function endGame(){
    let message;

    if(scoreTop > scoreBottom){
        message = `Top rod wins with a score of ${scoreTop}!`;
     } else if(scoreBottom > scoreTop) {
        message = `Bottom rod wins with a score of ${scoreBottom}!`;
    } else {
        message = `Its a tie! both rods scored ${scoreTop && scoreBottom} points.`;
    }

    alert(message);
    //reset the game
    resetGame();
}

//function to check the key board events
function handleKeyboard(event){
    if(event.key === 'Enter' && event.key!== ''){
        startNewRound();
        pauseBgMusic();
    }else if(event.key === 'a' || event.key === 'A'){
        //it moves the rod to the left direction when a or A is pressed
        rodX -= 20;
    }else if(event.key === 'd' || event.key === 'D'){
        //it moves the rod to the right direction
        rodX += 20;
    }else if(event.key === 'f' || event.key === 'F'){
        playBgMusic();
    } else if(event.key === 'w' || event.key === 'W'){
        pauseBgMusic();
    } else if (event.key === 'n' || event.key === 'N') {
        playNextSong();
    }

    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
    }
    
}
//adds event listener to the keyboard
document.addEventListener('keydown',handleKeyboard);

//function to start the game 

function startGame(){
    //start the game
    const highestScore = localStorage.getItem('highestScore');
    const playerName = localStorage.getItem('playerName');

    if(highestScore && playerName){
        //if the player has a high score and a name
        alert('highest score : ${highestScore} by {playerName}');
        
    }else{
        alert("This is your first Game! Pleasepress Enter key to start the new game");
    }

    //start the new game
    setInterval(updatePositions,10);
    playBgMusic();
}

//call the start game function to begin the game 

startGame();