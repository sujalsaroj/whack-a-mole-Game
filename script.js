 const boxElement = document.querySelectorAll('.box');
    const startbtn = document.querySelector('#start');
    const restartbtn = document.querySelector('#restart');
    const timeDisplay = document.querySelector('#Timer');
    const scoreDisplay = document.querySelector('#scoreDisplay');

    const moleSound = new Audio('moleSound.mp3');  // Place this file in the same folder
    const bombSound = new Audio('bombSound.mp3');  // Place this file in the same folder

    let gameInterval;
    let timerInterval;
    let activeGame = false;
    let score = 0;
    let timer = 60;
    let moleClicked = 0;
    let bombClicked = 0;
    let totalclicked = 0;

    function randomMoleOrBomb() {
      boxElement.forEach(box => {
        box.innerText = '';
        box.setAttribute('data-type', 'none');
      });

      const randomBox = boxElement[Math.floor(Math.random() * boxElement.length)];
      const isMole = Math.random() > 0.6;
      if (isMole) {
        randomBox.innerText = '🐹';
        randomBox.setAttribute('data-type', 'mole');
      } else {
        randomBox.innerText = '💣';
        randomBox.setAttribute('data-type', 'bomb');
      }
    }

    boxElement.forEach(box => {
      box.addEventListener('click', () => {
        if (!activeGame) return;

        const type = box.getAttribute('data-type');
        if (type === 'none') return;

        totalclicked++;

        if (type === 'mole') {
          moleSound.currentTime = 0;
          moleSound.play();
          score += 10;
          moleClicked++;
        } else if (type === 'bomb') {
          bombSound.currentTime = 0;
          bombSound.play();
          score -= 5;
          bombClicked++;
        }

        setTimeout(() => {
          box.innerText = '';
          box.setAttribute('data-type', 'none');
        }, 300);  // delay for better click feel
      });
    });

    startbtn.addEventListener("click", () => {
      if (activeGame) return;

      activeGame = true;
      score = 0;
      timer = 60;
      moleClicked = 0;
      bombClicked = 0;
      totalclicked = 0;
      scoreDisplay.innerText = `Score: ${score}`;
      timeDisplay.innerText = `Timer: ${timer}`;

      gameInterval = setInterval(randomMoleOrBomb, 1000);
      timerInterval = setInterval(() => {
        timer--;
        scoreDisplay.innerText = `Score: ${score}`;
        timeDisplay.innerText = `Timer: ${timer}`;

        if (timer <= 0) {
          clearInterval(gameInterval);
          clearInterval(timerInterval);
          activeGame = false;

          let accuracy = totalclicked === 0 ? 0 : (moleClicked / totalclicked) * 100;
          alert(`Time's up! You scored ${score} points.
You hit ${moleClicked} moles.
You clicked ${bombClicked} bombs.
Your accuracy: ${accuracy.toFixed(2)}%`);

          boxElement.forEach(box => {
            box.innerText = '';
            box.setAttribute('data-type', 'none');
          });
        }
      }, 1000); // 1 second interval for timer
    });

    restartbtn.addEventListener("click", () => {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      score = 0;
      timer = 60;
      moleClicked = 0;
      bombClicked = 0;
      totalclicked = 0;
      activeGame = false;
      scoreDisplay.innerText = `Score: ${score}`;
      timeDisplay.innerText = `Timer: ${timer}`;

      boxElement.forEach(box => {
        box.innerText = '';
        box.setAttribute('data-type', 'none');
      });
    });