var cells = [];
var cellSize = 15;
var cellOffset = cellSize * 2;
var qBasis, rBasis;
var w = 21, h = 25, mines = 20;

function setup() {
	qBasis = createVector(cellSize * sqrt(3), 0);
	rBasis = createVector(cellSize * sqrt(3)/2, cellSize * 3/2);

	generateField();

	createCanvas(600, 600);
	for(var r = 0; r < h; r++) {
		for(var q = -floor(r / 2); q < w - floor(r / 2); q++) {
			cells.push(new Cell(q, r));
		}
	}
}

function generateField() {
	
}

function draw() {
	background(51);
	var axial = screenToAxial(mouseX, mouseY);
	for(var i = 0; i < cells.length; i++) {
		if(cells[i].r === axial.r && cells[i].q === axial.q) {
			cells[i].c = 200;
		} else {
			cells[i].c = 127;
		}

		cells[i].draw();
	}
}

function mouseReleased() {
	var index = axialToIndex(screenToAxial(mouseX, mouseY));
	cells[index].reveal();
}

function screenToAxial(mx, my) {
	var x = mx - cellOffset;
	var y = my - cellOffset;
	var q = (x * sqrt(3)/3 - y / 3) / cellSize;
	var r = y * 2/3 / cellSize;

	return axialRound({q:q, r:r});
}

function axialRound(axial) {
	var q = axial.q;
	var r = axial.r;
	var s = -axial.r-axial.q;

	var rq = round(q);
	var rr = round(r);
	var rs = round(s);

	var qDiff = abs(rq - q)
	var rDiff = abs(rr - r)
	var sDiff = abs(rs - s)

	if(qDiff > rDiff && qDiff > sDiff) {
		rq = -rr-rs
	} else if(rDiff > sDiff) {
		rr = -rq-rs
	} else {
		rs = -rq-rr;
	}

	return {q:rq, r:rr};
}

function axialToIndex(axial) {
	var col = axial.q + floor(axial.r / 2);
	var row = axial.r;
	return row * w + col;
}

function resetGame() {
	// Reset the game
	console.log("Resetting...");
	generateField();
}
