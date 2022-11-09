import Canvas from "./js/canvas";
import Config from "./js/config";
import GameLoop from "./js/gameLoop";
import Snake from "./js/snake";
import Score from "./js/score";
import Berry from "./js/berry";

class Game {
	constructor(container) {
		this.canvas = new Canvas(container);
		this.snake = new Snake();
		this.berry = new Berry(this.canvas);
		this.score = new Score(".game-score .score-count", 0);
		// debugger;

		new GameLoop(this.update.bind(this), this.draw.bind(this));
	}

	update() {
		this.snake.update(this.berry, this.score, this.canvas);
	}

	draw() {
		this.canvas.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height);
		debugger;
		this.snake.draw(this.canvas.context);
		this.berry.draw(this.canvas.context);
	}
}

new Game(document.querySelector(".canvas-wrapper"));
