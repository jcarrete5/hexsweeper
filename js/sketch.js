var cells = [];

function setup() {
	createCanvas(600, 600);
	cells.push(new Cell(100, 100));
}

function draw() {
	background(51);
	for(var i = 0; i < cells.length; i++) {
		cells[i].draw();
	}
}

function resetGame() {
	// Reset the game
}
