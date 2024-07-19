document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const step = 10;
    const gameBoardWidth = parseInt(getComputedStyle(gameBoard).width) - step;
    const gameBoardHeight = parseInt(getComputedStyle(gameBoard).height) - step;
    let direction;
    let snakeBody = [];
    let length = 0;
    let intervalId;
    let time = 60;
    let prevTime = time;

    function initSnake() {
        let snake = document.querySelector('.snake');

        // head
        let head = document.createElement('div');
        head.classList.add('snake-cell', 'snake-head');
        head.style.left = Math.floor(Math.random() * (gameBoardWidth - 20)) + 'px';
        head.style.top = Math.floor(Math.random() * (gameBoardHeight - 20)) + 'px';
        head.style.backgroundColor = 'red';
        snake.appendChild(head);
        snakeBody.push(head);
        //length += 1;

        let left = parseInt(head.style.left);
        let top = parseInt(head.style.top);

        direction = (left < gameBoardWidth / 2) ? 'right' : 'left';

        // body
        for (let i = 1; i <= 4; i++) {
            let newPart = document.createElement('div');
            newPart.classList.add('snake-body');

            if (direction === 'right') {
                newPart.style.left = (left - (step * i)) + 'px';
            } else {
                newPart.style.left = (left + (step * i)) + 'px';
            }

            newPart.style.top = top + 'px';
            snake.appendChild(newPart);
            snakeBody.push(newPart);
            length += 1;
        }
    }

    function initApple() {
        let apple = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        apple.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        apple.setAttribute("width", "32");
        apple.setAttribute("height", "32");
        apple.setAttribute("viewBox", "0 0 72 72");
        apple.innerHTML = '<path fill="#ea5a47" d="M53.88 21.51a11.42 11.42 0 0 0-10.737.504l-.109.052a22.9 22.9 0 0 1-7.567 1.877a15.9 15.9 0 0 1-6.638-1.85l-.141-.076a11.41 11.41 0 0 0-10.764-.506C10.7 25.14 8.1 36.69 12.129 47.254c2.373 6.232 6.685 11.08 11.535 12.966a10.98 10.98 0 0 0 9.134-.266a11.4 11.4 0 0 0 1.532-.931a2.73 2.73 0 0 1 3.158 0a11 11 0 0 0 1.532.932a10.5 10.5 0 0 0 4.735 1.127a12.1 12.1 0 0 0 4.383-.86c4.851-1.885 9.165-6.733 11.539-12.967c4.03-10.57 1.43-22.12-5.797-25.745"/><path fill="#f4aa41" d="M48.999 21.405a1 1 0 0 0-.246.01l.038-.227c.076.075.142.141.208.217"/><path fill="#d22f27" d="M53.883 21.511a10.4 10.4 0 0 0-4.902-1.106a1 1 0 0 0-.696 1.7c9.444 9.624 6.388 19.16 3.727 23.988c-3.892 7.058-10.844 11.465-14.457 10.68a1 1 0 0 0-.672 1.865a15.5 15.5 0 0 0 7.169 1.898a12.9 12.9 0 0 0 4.629-.863c4.66-1.776 8.668-6.304 10.995-12.422c4.035-10.568 1.438-22.115-5.793-25.74"/><path fill="#b1cc33" d="M48.045 17.395c3.956 1.329 6.844 5.819 6.844 5.819s-5.014 1.835-8.97.506c-3.95-1.327-6.844-5.82-6.844-5.82s5.019-1.833 8.97-.505"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M35.046 20.733v-5.461l-4.344-4.343m26.632 14.837c3.648 4.949 4.396 13.296 1.409 21.133c-3.857 10.128-12.488 15.573-19.274 12.163a10 10 0 0 1-1.394-.85a3.71 3.71 0 0 0-4.331 0a10 10 0 0 1-1.396.85c-6.797 3.41-15.428-2.035-19.285-12.163c-3.856-10.118-1.475-21.085 5.31-24.494a10.42 10.42 0 0 1 9.838.491s.056.034.168.09a16.9 16.9 0 0 0 7.088 1.957a13.3 13.3 0 0 0 2.249-.215a19 19 0 0 0 2.126-.463m8.203-6.87c3.956 1.329 6.844 5.819 6.844 5.819s-5.014 1.835-8.97.506c-3.95-1.327-6.844-5.82-6.844-5.82s5.019-1.833 8.97-.505"/>';
        apple.style.position = 'absolute';
        apple.style.left = Math.floor(Math.random() * (gameBoardWidth - 20)) + 'px';
        apple.style.top = Math.floor(Math.random() * (gameBoardHeight - 20)) + 'px'
        apple.classList.add('apple');
        gameBoard.appendChild(apple);
    }

    function isNear(x1, y1, x2, y2, toleranceX = 8, toleranceY = 16) {
        return Math.abs(x1 - x2 - step) <= toleranceX && Math.abs(y1 - y2 - step) <= toleranceY;
    }

    function collision() {
        gameInfo = document.querySelector('.game-info');
        gameInfo.style.visibility = 'visible';
        document.getElementById('game-over').innerHTML = 'Game Over';
        document.getElementById('score').innerHTML = 'Score: ' + length;
        document.getElementById('game-start').innerHTML = 'Play again';
        canvas.style.display = 'none';
        clearInterval(intervalId);
        // snakeBody.forEach(part => part.remove());
        // snakeBody = [];
        // let apple = document.querySelector('.apple');
        // if (apple) apple.remove();
        //initSnake();
        //initApple();
        // time = 60;
        // clearInterval(intervalId);
        // intervalId = setInterval(moveSnake, time);
        return;
    }

    function initSnowflake() {
        // Sprawdź, czy długość węża jest większa lub równa 6
        let snowflake = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        snowflake.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        snowflake.setAttribute("width", "30");
        snowflake.setAttribute("height", "30");
        snowflake.setAttribute("viewBox", "0 0 72 72");
        snowflake.innerHTML = '<path fill="#20b5fa" stroke="#20b5fa" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M36 7v58M11.237 50.502l49.526-29.004m0 29.004L11.237 21.498m9.806 5.742V16m4.914-2.292L36 18.458M21.043 27.24L11 31.991m35.043-18.283L36 18.458M25.957 58.209L36 53.458m10.043 4.751L36 53.458m-14.923-8.716l-10.043-4.75M61 31.991L50.957 27.24m10.011 12.752l-10.043 4.75m0 11.241V44.742M21.077 55.983V44.742m29.88-17.502V16"/>';
        snowflake.style.position = 'absolute';
        snowflake.style.left = Math.floor(Math.random() * (gameBoardWidth - 20)) + 'px';
        snowflake.style.top = Math.floor(Math.random() * (gameBoardHeight - 20)) + 'px';
        snowflake.classList.add('snowflake');
        gameBoard.appendChild(snowflake);
    }
    
    // function checkCollision() {
    //     let snakeHead = snakeBody[0];
    //     let headLeft = parseInt(snakeHead.style.left);
    //     let headTop = parseInt(snakeHead.style.top);
    
    //     // Kolizja z krawędziami planszy
    //     if (headLeft < 0 || headLeft >= gameBoardWidth || headTop < 0 || headTop >= gameBoardHeight) {
    //         alert('game over');
    //         return true; // Kolizja z krawędziami
    //     }

    //     // Kolizja z samym sobą
    //     for (let i = 1; i < snakeBody.length; i++) {
    //         if (headLeft === parseInt(snakeBody[i].style.left) && headTop === parseInt(snakeBody[i].style.top)) {
    //             alert('game over');
    //             return true; 
    //         }
    //     }

    //     return false;
    // }

    function moveSnake() {
        if (!direction) return;

        let newHead = {
            left: parseInt(snakeBody[0].style.left),
            top: parseInt(snakeBody[0].style.top)
        };

        switch (direction) {
            case 'left':
                if (newHead.left - step > 0) {
                    newHead.left -= step;
                } else {
                    // snakeBody.forEach(part => part.remove());
                    // snakeBody = [];
                    // apple.remove();
                    // initSnake();
                    // initApple();
                    collision();
                    return;
                }
                break;
            case 'up':
                if (newHead.top - step > 0) {
                    newHead.top -= step;
                } else {
                    // snakeBody.forEach(part => part.remove());
                    // snakeBody = [];
                    // apple.remove();
                    // initSnake();
                    // initApple();
                    collision();
                    return;
                }
                break;
            case 'right':
                if (newHead.left + step < gameBoardWidth + 5) {
                    newHead.left += step;
                } else {
                    // snakeBody.forEach(part => part.remove());
                    // snakeBody = [];
                    // apple.remove();
                    // initSnake();
                    // initApple();  
                    collision();
                    return;
                }
                break;
            case 'down':
                if (newHead.top + step < gameBoardHeight + 10) {
                    newHead.top += step;
                } else {
                    // snakeBody.forEach(part => part.remove());
                    // snakeBody = [];
                    // apple.remove();
                    // initSnake();
                    // initApple();
                    collision();
                    return;
                }
                break;
        }

            // if (checkCollision()) {
            //     snakeBody.forEach(part => part.remove());
            //     snakeBody = [];
            //     let apple = document.querySelector('.apple');
            //     if (apple) apple.remove();
            //     initSnake();
            //     initApple();
            //     return;
            // }



        // apple
        let apple = document.querySelector('.apple');
        //console.log(`Snake head position: ${newHead.left}, ${newHead.top}`);
        //console.log(`Apple position: ${parseInt(apple.style.left)}, ${parseInt(apple.style.top)}`);
        
        if (isNear(newHead.left, newHead.top, parseInt(apple.style.left), parseInt(apple.style.top))) {
            console.log(length);
            apple.remove();
            initApple();
            let newPart = document.createElement('div');
            newPart.classList.add('snake-body');
            snakeBody.push(newPart);
            length += 1;
            console.log(`Snake length: ${length}`);
            gameBoard.appendChild(newPart);
            //alert('apple eaten');
            time >= 45 ? time -=1 : time = 45;
            clearInterval(intervalId);
            intervalId = setInterval(moveSnake, prevTime);
            if(length >= 5 && length % 5 == 0) {
                let snowflake = document.querySelector('.snowflake');
                if (snowflake) snowflake.remove();
                initSnowflake();
            };
        }

        // snowflake
        let snowflake = document.querySelector('.snowflake');
        if (snowflake) {
            if (isNear(newHead.left, newHead.top, parseInt(snowflake.style.left), parseInt(snowflake.style.top))) {
                let canvas = document.getElementById('canv');
        
                // Jeśli canvas nie istnieje, utwórz go
                if (!canvas) {
                    canvas = document.createElement('canvas');
                    canvas.id = 'canv';
                    document.body.appendChild(canvas);
                } else {
                    canvas.style.display = 'block'; // Pokaż canvas, jeśli już istnieje
                }
        
                Snowy();
                snowflake.remove();
                if (length >= 6) {
                    let existingSnowflake = document.querySelector('.snowflake');
                    if (existingSnowflake) {
                        snowflake.remove();
                    }
                }
                let backgroundSnow = document.createElement('div');
                backgroundSnow.classList.add('backgroundSnow');
                gameBoard.appendChild(backgroundSnow);
        
                let transition = document.querySelector('.snake-body');
                transition.style.transition = 'all 140ms linear';
                head.style.transition = 'all 140ms linear';

                prevTime = 60 - length;
                time = 100;
                clearInterval(intervalId);
                intervalId = setInterval(moveSnake, time);

                if (isNear(newHead.left, newHead.top, parseInt(apple.style.left), parseInt(apple.style.top))) {
                    prevTime = 60 - length; 
                }

                setTimeout(() => {
                    let canvas = document.getElementById('canv');
                    time = prevTime;
                    if (canvas) {
                        canvas.style.display = 'none';
                        clearInterval(intervalId);
                        intervalId = setInterval(moveSnake, time);
                    }
                }, 8000);
            }
        }
        

        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i].style.left = snakeBody[i - 1].style.left;
            snakeBody[i].style.top = snakeBody[i - 1].style.top;
        }

        snakeBody[0].style.left = newHead.left + 'px';
        snakeBody[0].style.top = newHead.top + 'px';
    }
    document.getElementById('game-start').addEventListener('click', () => {
        gameInfo = document.querySelector('.game-info');
        gameInfo.style.visibility = 'hidden';
        snakeBody.forEach(part => part.remove());
        snakeBody = [];
        let apple = document.querySelector('.apple');
        if (apple) apple.remove();
        initSnake();
        initApple();
        let snowflake = document.querySelector('.snowflake');
        if(snowflake) snowflake.remove();
        initSnowflake()
        length = 0;
        time = 60;
        clearInterval(intervalId);
        intervalId = setInterval(moveSnake, time);
        return;
    });
    

    document.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
            case 65: // A - left
                if (direction !== 'right') direction = 'left';
                break;
            case 87: // W - up
                if (direction !== 'down') direction = 'up';
                break;
            case 68: // D - right
                if (direction !== 'left') direction = 'right';
                break;
            case 83: // S - down
                if (direction !== 'up') direction = 'down';
                break;
        }
    });

    const canvas = document.getElementById('canv');
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

function Snowy() {
    const snowflakes = [];
    const numSnowflakes = 600;
    const speedFactor = 1;
    const sizeCoefficient = 1.3;
    const minSpeed = 1;

    for (let i = 0; i < numSnowflakes; ++i) {
        const size = (50 / (10 + (Math.random() * 500))) * sizeCoefficient;
        const speed = Math.max((Math.pow(size * 0.8, 2) * 0.15) * speedFactor, minSpeed);

        snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * (height + 10),
            t: Math.random() * (Math.PI * 2),
            size,
            speed
        });
    }

    function drawSnowflake(flake) {
        const gradient = ctx.createRadialGradient(flake.x, flake.y, 0, flake.x, flake.y, flake.size);
        gradient.addColorStop(0, 'hsla(255,255%,255%,1)');
        gradient.addColorStop(1, 'hsla(255,255%,255%,0)');

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    function updateSnowflakes() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillRect(0, 0, width, height);
        ctx.fill();

        snowflakes.forEach(flake => {
            flake.t += 0.05;
            flake.t = flake.t >= Math.PI * 2 ? 0 : flake.t;
            flake.y += flake.speed;
            flake.x += Math.sin(flake.t) * (flake.size * 0.3);

            if (flake.y > height + 50) flake.y = -10 - Math.random() * 20;
            if (flake.x > width + 20) flake.x = -20;
            if (flake.x < -20) flake.x = width + 20;

            drawSnowflake(flake);
        });

        requestAnimationFrame(updateSnowflakes);
    }

    updateSnowflakes();
}

/*________________________________________*/
    window.addEventListener('resize', () => {
        canvas.width = width = window.innerWidth;
        canvas.height = height = window.innerHeight;
    }, false);
});
