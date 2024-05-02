export default class Controls {
  constructor(game, visual) {
    this.game = game;
    this.visual = visual;
    this.isPlaying = false;
    this.intervalID = null;
    this.myAudio6 = game.myAudio6;
    // const state = this.game.getState();

    document.addEventListener("keydown", (event) => {
      const state = this.game.getState();
      switch (event.keyCode) {
        case 13: //ENTER
          if (state.isGameOver) {
            this.restart();
          } else if (this.isPlaying) {
            this.pause();
          } else {
            this.play();
          }
          break;
        case 37:
          game.movePieceLeft();
          this.updateVisual();
          break;
        case 38:
          game.rotatePiese();
          this.updateVisual();
          break;
        case 39:
          game.movePieceRight();
          this.updateVisual();
          break;
        case 40:
          this.stopTimer();
          game.movePieceDown();
          this.updateVisual();
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      const state = this.game.getState();
      switch (event.keyCode) {
        case 40:
          this.startTimer();

          break;
      }
    });

    this.visual.renderStart();
  }
  clickControl() {
    const btnLeft = document.getElementById("btnLeft");
    btnLeft.addEventListener("click", () => {
      this.game.movePieceLeft();
      this.updateVisual();
    });
    const btnUp = document.getElementById("btnUp");
    btnUp.addEventListener("click", () => {
      this.game.rotatePiese();
      this.updateVisual();
    });
    const btnRotate = document.getElementById("btnRotate");
    btnRotate.addEventListener("click", () => {
      this.game.rotatePiese();
      this.updateVisual();
    });
    const btnRight = document.getElementById("btnRight");
    btnRight.addEventListener("click", () => {
      this.game.movePieceRight();
      this.updateVisual();
    });
    const btnDown = document.getElementById("btnDown");
    btnDown.addEventListener("click", () => {
      this.game.movePieceDown();
      this.updateVisual();
    });
  }

  update() {
    this.game.movePieceDown();
    this.updateVisual();
  }
  updateVisual() {
    const state = this.game.getState();
    if (state.isGameOver) {
      this.visual.renderGameOver(state);
      this.stopTimer();
    } else if (!this.isPlaying) {
      this.visual.renderPause();
    } else {
      this.visual.renderMain(this.game.getState());
    }
  }

  restart() {
    clearInterval(this.intervalID);
    this.game.restart();
    this.play();
  }

  play() {
    this.isPlaying = true;
    this.startTimer();
    this.updateVisual();
  }
  pause() {
    this.isPlaying = false;
    this.stopTimer();
    this.updateVisual();
    this.myAudio6.play();
  }
  startTimer() {
    const speed = 1000 - this.game.getState().level * 100;
    this.intervalID = setInterval(() => {
      this.update();
    }, speed);
  }

  stopTimer() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }
}

// visual.renderPause();
