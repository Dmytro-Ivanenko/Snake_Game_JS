import Config from "./config";

export default class Snake {
	constructor() {
		this.config = new Config();

		this.x = 160;
		this.y = 160;
		this.dx = this.config.sizeCell;
		this.dy = 0;
		this.tails = [];
		this.maxTails = 3;

		this.reverseKey = "";
		this.control();
	}

	update(berry, score, canvas) {
		this.x += this.dx;
		this.y += this.dy;

		if (this.x < 0) {
			this.x = canvas.element.width - this.config.sizeCell;
		} else if (this.x >= canvas.element.width) {
			this.x = 0;
		}

		if (this.y < 0) {
			this.y = canvas.element.height - this.config.sizeCell;
		} else if (this.y >= canvas.element.height) {
			this.y = 0;
		}

		this.tails.unshift({ x: this.x, y: this.y });

		if (this.tails.length > this.maxTails) {
			this.tails.pop();
		}

		this.tails.forEach((el, index) => {
			if (el.x === berry.x && el.y === berry.y) {
				this.maxTails++;
				score.incScore();
				berry.randomPosition();
			}

			for (let i = index + 1; i < this.tails.length; i++) {
				if (el.x == this.tails[i].x && el.y == this.tails[i].y) {
					this.death();
					score.setToZero();
					berry.randomPosition();
				}
			}
		});
	}

	draw(context) {
		this.tails.forEach((el, index) => {
			// index == 0 ? (context.fillStyle = "orange") : (context.fillStyle = this.randColor());

			if (index === 0) {
				context.fillStyle = "orange";
			} else if (index % 2 === 0) {
				context.fillStyle = "grey";
			} else {
				context.fillStyle = "black";
			}

			context.fillRect(el.x, el.y, this.config.sizeCell, this.config.sizeCell);
		});
	}

	death() {
		this.y = 160;
		this.dx = this.config.sizeCell;
		this.dy = 0;
		this.tails = [];
		this.maxTails = 3;
		this.reverseKey = "";
	}

	control() {
		document.addEventListener("keydown", e => {
			if (e.code == "KeyW" && this.reverseKey !== "KeyS") {
				this.dy = -this.config.sizeCell;
				this.dx = 0;
				this.reverseKey = "KeyW";
			} else if (e.code == "KeyA" && this.reverseKey !== "KeyD") {
				this.dx = -this.config.sizeCell;
				this.dy = 0;
				this.reverseKey = "KeyA";
			} else if (e.code == "KeyS" && this.reverseKey !== "KeyW") {
				this.dy = this.config.sizeCell;
				this.dx = 0;
				this.reverseKey = "KeyS";
			} else if (e.code == "KeyD" && this.reverseKey !== "KeyA") {
				this.dx = this.config.sizeCell;
				this.dy = 0;
				this.reverseKey = "KeyD";
			}
		});
	}
}
