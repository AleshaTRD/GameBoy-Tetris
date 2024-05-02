class Game {
  static points = {
    1: 40,
    2: 100,
    3: 200,
    4: 500,
  };
  score = 0;
  lines = 0;
  playfield = this.createPlayfield(); //нулевой массив
  activePiece = this.createPiece();
  nextPiece = this.createPiece();
  get level() {
    return Math.floor(this.lines * 0.1);
  }
  gameOver = false;
  nicName = "";
  myAudio = new Audio("./sounds/blockRotate.mp3");
  myAudio2 = new Audio("./sounds/whoosh.mp3");
  myAudio3 = new Audio("./sounds/clear.mp3");
  myAudio4 = new Audio("./sounds/gameover.mp3");
  myAudio5 = new Audio("./sounds/fall.mp3");
  myAudio6 = new Audio("./sounds/pause.mp3");

  restart() {
    this.score = 0;
    this.lines = 0;
    this.playfield = this.createPlayfield(); //нулевой массив
    this.activePiece = this.createPiece();
    this.nextPiece = this.createPiece();
    this.gameOver = false;
  }

  getState() {
    const playfield = this.createPlayfield();
    const pieceX = this.activePiece.x;
    const pieceY = this.activePiece.y;
    const blocks = this.activePiece.blocks;
    // console.log("зис", this.playfield);
    // console.log("121212", { playfield });
    // console.log("1111", playfield);

    for (let y = 0; y < this.playfield.length; y++) {
      playfield[y] = [];
      for (let x = 0; x < this.playfield[y].length; x++) {
        playfield[y][x] = this.playfield[y][x];
      }
    }

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }
    // console.log("после гетстэйт pole", pole);
    // console.log("после гетстэйт обьект", { playfield });

    return {
      playfield,
      level: this.level,
      score: this.score,
      lines: this.lines,
      nextPiece: this.nextPiece,
      isGameOver: this.gameOver,
      nicName: this.nicName,
    };
  }
  createPlayfield() {
    const playfield = [];
    for (let y = 0; y < 20; y++) {
      playfield[y] = [];
      for (let x = 0; x < 10; x++) {
        playfield[y][x] = 0;
      }
    }
    console.log("---------", playfield);
    return playfield;
  }

  createPiece() {
    const index = Math.floor(Math.random() * 7);
    const type = "1234567"[index];
    const piece = { x: 3, y: -1 };

    switch (type) {
      case "1":
        piece.blocks = [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
        break;

      case "2":
        piece.blocks = [
          [0, 0, 0, 0],
          [0, 2, 2, 0],
          [0, 2, 2, 0],
          [0, 0, 0, 0],
        ];
        break;

      case "3":
        piece.blocks = [
          [0, 0, 0],
          [3, 3, 3],
          [0, 0, 3],
        ];
        break;

      case "4":
        piece.blocks = [
          [0, 0, 0],
          [4, 4, 4],
          [0, 4, 0],
        ];
        break;

      case "5":
        piece.blocks = [
          [0, 0, 0],
          [5, 5, 0],
          [0, 5, 5],
        ];
        break;

      case "6":
        piece.blocks = [
          [0, 0, 0],
          [0, 6, 6],
          [6, 6, 0],
        ];
        break;

      case "7":
        piece.blocks = [
          [0, 0, 0],
          [7, 7, 7],
          [7, 0, 0],
        ];
        break;
    }
    return piece;
  }

  movePieceLeft() {
    this.activePiece.x -= 1;
    if (this.isPieceOut()) {
      this.activePiece.x += 1;
    }
    this.myAudio2.play();
  }
  movePieceRight() {
    this.activePiece.x += 1;
    if (this.isPieceOut()) {
      this.activePiece.x -= 1;
    }
    this.myAudio2.play();
  }
  movePieceDown() {
    if (this.gameOver) {
      return;
    }

    this.activePiece.y += 1;
    if (this.isPieceOut()) {
      this.activePiece.y -= 1;
      this.lockPiece();
      const clearedLines = this.clearLines();
      this.updateScore(clearedLines);
      this.updatePiece();
    }

    if (this.isPieceOut()) {
      this.gameOver = true;
      this.myAudio4.play();
    }
  }
  rotatePiese() {
    const blocks = this.activePiece.blocks;
    const length = blocks.length;
    this.myAudio.play();
    const rotateBlock = [];
    for (let i = 0; i < length; i++) {
      rotateBlock[i] = new Array(length).fill(0);
    }

    for (let y = 0; y < length; y++) {
      for (let x = 0; x < length; x++) {
        rotateBlock[x][y] = blocks[length - 1 - y][x];
      }
    }
    this.activePiece.blocks = rotateBlock;
    if (this.isPieceOut()) {
      this.activePiece.blocks = blocks;
    }
  }
  //выходит ли кусок за границы поля
  isPieceOut() {
    const pieceX = this.activePiece.x;
    const pieceY = this.activePiece.y;
    const blocks = this.activePiece.blocks;
    const playfield = this.playfield;
    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          blocks[y][x] &&
          (playfield[pieceY + y] === undefined ||
            playfield[pieceY + y][pieceX + x] === undefined ||
            playfield[pieceY + y][pieceX + x])
        ) {
          return true;
        }
      }
    }
    return false;
  }

  lockPiece() {
    const pieceX = this.activePiece.x;
    const pieceY = this.activePiece.y;
    const blocks = this.activePiece.blocks;
    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }
    this.myAudio5.play();
  }

  clearLines() {
    const lines = [];
    const rows = 20;
    const columns = 10;

    for (let y = rows - 1; y >= 0; y--) {
      let blocksNum = 0;

      for (let x = 0; x < columns; x++) {
        if (this.playfield[y][x]) {
          blocksNum += 1;
        }
      }

      if (blocksNum === 0) {
        break;
      } else if (blocksNum < columns) {
        continue;
      } else if (blocksNum === columns) {
        lines.unshift(y);
      }
    }
    for (let i of lines) {
      this.playfield.splice(i, 1);
      this.playfield.unshift(new Array(columns).fill(0));
    }

    return lines.length;
  }

  updateScore(clearedLines) {
    console.log("qqqqqqqqqq", this.level);
    if (clearedLines > 0) {
      this.myAudio3.play();
      this.score += Game.points[clearedLines] * (this.level + 1);
      this.lines += clearedLines;
      console.log(
        "qqqqqqqqqqqqqqqqqqqqqqq",
        this.score,
        this.lines,
        this.level
      );
    }
  }

  updatePiece() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }
}

export default Game;
