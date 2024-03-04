document.addEventListener('DOMContentLoaded', () => {
    const leftPaddle = document.getElementById('leftPaddle');
    const rightPaddle = document.getElementById('rightPaddle');
    const ball = document.getElementById('ball');

    const knobController = document; // replace with your knob controller element

    let leftPaddleY = 150; // initial position
    const paddleSpeed = 10;

    let ballX = 400; // initial position
    let ballY = 200;
    let ballSpeedX = -5; // Start moving to the left
    let ballSpeedY = 5;

    let rightPaddleY = (400 - rightPaddle.clientHeight) / 2;
    const playerSpeed = 5;

    knobController.addEventListener('wheel', (event) => {
        // Adjust the paddle position based on the wheel movement
        leftPaddleY += event.deltaY > 0 ? paddleSpeed : -paddleSpeed;
        updatePaddlePosition(leftPaddle, leftPaddleY);
    });

    function updatePaddlePosition(paddle, y) {
        // Ensure the paddle stays within the game container
        if (y < 0) {
            y = 0;
        } else if (y > 300) {
            y = 300;
        }

        paddle.style.top = `${y}px`;
    }

    function updateRightPaddle() {
        // AI: Follow the ball's vertical position
        if (ballSpeedX > 0) {
            if (rightPaddleY + rightPaddle.clientHeight / 2 < ballY) {
                rightPaddleY += playerSpeed;
            } else {
                rightPaddleY -= playerSpeed;
            }

            // Ensure right paddle stays within the game container
            if (rightPaddleY < 0) {
                rightPaddleY = 0;
            } else if (rightPaddleY + rightPaddle.clientHeight > 400) {
                rightPaddleY = 400 - rightPaddle.clientHeight;
            }

            updatePaddlePosition(rightPaddle, rightPaddleY);
        }
    }

    function updateBallPosition() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Ball collision with top and bottom walls
        if (ballY < 0 || ballY > 380) {
            ballSpeedY = -ballSpeedY;
        }

        // Ball collision with paddles
        if (
            (ballX <= 30 && ballX >= 10 && ballY + 20 >= leftPaddleY && ballY <= leftPaddleY + 100) ||
            (ballX >= 750 && ballX <= 770 && ballY + 20 >= rightPaddleY && ballY <= rightPaddleY + 100)
        ) {
            ballSpeedX = -ballSpeedX;
        }

        // Scoring
        if (ballX < 0 || ballX > 800) {
            // Reset ball position
            ballX = 400;
            ballY = 200;
            ballSpeedX = -5; // Start moving to the left again
        }

        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;
    }


    function gameLoop() {
        // Update left paddle position with wheel event

        // Update right paddle position with AI logic
        updateRightPaddle();

        // Update ball position
        updateBallPosition();

        requestAnimationFrame(gameLoop);
    }

    gameLoop(); // Start the game loop
});
