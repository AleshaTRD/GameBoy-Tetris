export default class Visual {
  constructor(elem, width, height, rows, columns) {
    this.elem = elem;
    this.width = width;
    this.height = height;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");

    this.playfieldBorder = 4; //ширина границы экрана
    this.playfieldX = this.playfieldBorder; //отступ от начала экрана по Х
    this.playfieldY = this.playfieldBorder; //отступ от начала экрана по Y
    this.playfieldWidth = (this.width * 2) / 3; //ширина игровой зоны 2/3 от экрана
    this.playfieldHight = this.height; //высота игровой зоны = весь экран
    this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorder * 2; //ширина игровой зоны без рамок
    this.playfieldInnerHight = this.playfieldHight - this.playfieldBorder * 2; //высота игровой зоны без рамок

    this.blockWidth = this.playfieldInnerWidth / columns; //ширина блока фигурки
    this.blockHeight = this.playfieldInnerHight / rows; //высота блока фигурки

    this.panelX = this.playfieldWidth + 5;
    this.panelY = 0;
    this.panelWight = this.width / 3;
    this.panelHeight = this.height;

    this.elem.appendChild(this.canvas);
  }
  static colors = {
    1: "cyan",
    2: "blue",
    3: "red",
    4: "yellow",
    5: "orange",
    6: "green",
    7: "purple",
  };

  // iteratingArr(arr){
  // for (let y of playfield) {
  //   const line = playfield[y];
  //   for (let x of line) {
  //     const block = line[x];
  //       }
  //     }
  renderMain(state) {
    // console.log("666", playfield);
    this.clearScreen();
    this.renderPlayfield(state);
    this.renderPanel(state);
  }
  renderStart() {
    this.context.fillStyle = "black";
    this.context.font = '16px "Press Start 2p"';
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(
      "Press ENTER to Start",
      this.width / 2,
      this.height / 2
    );
  }

  renderPause() {
    this.context.fillStyle = "rgba(0,0,0,0.75)";
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.fillStyle = "black";
    this.context.font = '16px "Press Start 2p"';
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(
      "Press ENTER to Resume",
      this.width / 2,
      this.height / 2
    );
  }

  renderPlayfield({ playfield }) {
    // console.log("777", playfield);
    // console.log("888", playfield.length);

    for (let y = 0; y < playfield.length; y++) {
      const line = playfield[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block) {
          this.renderBlock(
            //метод рисует блок
            this.playfieldX + x * this.blockWidth, // отступ по Х( на 1ой итерации 0 * ширину блока, на 2ой 1* ширину.....)
            this.playfieldY + y * this.blockHeight, // отступ по У ( по аналогии с Х)
            this.blockWidth, //ширина пряпоцгольника
            this.blockHeight, // высота прямоугольника
            Visual.colors[block]
          );
        }
      }
    }
    this.context.strokeStyle = "black"; //цвет границы
    this.context.lineWidth = this.playfieldBorder; //ширина границы
    this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHight);
  }

  renderPanel({ level, score, lines, nextPiece, nicName }) {
    this.context.textAlign = "start";
    this.context.textBaseline = "top";
    this.context.fillStyle = "black";
    this.context.font = '14px "Press Start 2p"';

    this.context.fillText("Name:", this.panelX, this.panelY + 10);
    this.context.fillText(`${nicName}`, this.panelX, this.panelY + 30);

    this.context.fillText("Score:", this.panelX, this.panelY + 54);
    this.context.fillText(`${score}`, this.panelX, this.panelY + 74);

    this.context.fillText(`Lines:`, this.panelX, this.panelY + 98);
    this.context.fillText(`${lines}`, this.panelX, this.panelY + 118);

    this.context.fillText(`Level:`, this.panelX, this.panelY + 142);
    this.context.fillText(`${level}`, this.panelX, this.panelY + 162);

    this.context.fillText("Next :", this.panelX, this.panelY + 222);

    for (let y = 0; y < nextPiece.blocks.length; y++) {
      for (let x = 0; x < nextPiece.blocks[y].length; x++) {
        const block = nextPiece.blocks[y][x];

        if (block) {
          this.renderBlock(
            this.panelX + x * this.blockWidth * 0.5,
            this.panelY + 236 + y * this.blockHeight * 0.5,
            this.blockWidth * 0.5,
            this.blockHeight * 0.5,
            Visual.colors[block]
          );
        }
      }
    }
  }

  renderBlock(x, y, width, height, color) {
    this.context.fillStyle = color; //цвет заливки
    this.context.strokeStyle = "black"; //цвет границы
    this.context.lineWidth = "2"; //ширина границы

    this.context.fillRect(x, y, width, height); //рисуем прямоугольник
    this.context.strokeRect(x, y, width, height); //рисуем обводку
  }

  clearScreen() {
    //очищаем поле перед отрисовкой нового кадра
    this.context.clearRect(0, 0, this.width, this.height);
  }

  renderGameOver({ score, nicName }) {
    this.clearScreen();

    this.context.fillStyle = "black";
    this.context.font = '16px "Press Start 2p"';
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText("GAME OVER", this.width / 2, this.height / 2 - 48);
    this.context.fillText(
      `${nicName} Score: ${score}`,
      this.width / 2,
      this.height / 2
    );
    this.context.fillText(
      "Press ENTER to Restart",
      this.width / 2,
      this.height / 2 + 48
    );
    this.setrecords(score, nicName);
  }
  // <input type="text" name="firstname" /> <br />
  // <input type="text" name="lastname" /> <br />

  // <input type="button" value="save" />
  setrecords(score, nicName) {
    console.log(score, nicName);
    if (localStorage.personsData) {
      const localPersonsData = JSON.parse(localStorage.personsData);

      localPersonsData.push({
        nicName,
        score,
      });

      localStorage["personsData"] = JSON.stringify(localPersonsData);
    } else {
      const personsDataArr = [];
      personsDataArr.push({
        nicName,
        score,
      });

      localStorage["personsData"] = JSON.stringify(personsDataArr);
    }
  }
}

// const saveBtn = document.querySelector("[value='save']");
// saveBtn.addEventListener("click", () => {
//   const firstname = document.querySelector("[name='firstname']").value;
//   const lastname = document.querySelector("[name='lastname']").value;

// });

// const x = JSON.parse(localStorage.personsData);
// console.log(x);
