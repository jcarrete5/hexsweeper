var cells = [];
var cellSize = 15;
var cellOffset = cellSize * 2;
var qBasis, rBasis;
var w = 21, h = 25, numMines = 100;
var qMin, qMax, rMin, rMax;

var imageSize = 10;
var assets = {}

function preload() {
	assets[1] = loadImage("assets/1.png");
	assets[2] = loadImage("assets/2.png");
	assets[3] = loadImage("assets/3.png");
	assets[4] = loadImage("assets/4.png");
	assets[5] = loadImage("assets/5.png");
	assets[6] = loadImage("assets/6.png");
	assets[9] = loadImage("assets/mine.png");
}

function setup() {
	qBasis = createVector(cellSize * sqrt(3), 0);
	rBasis = createVector(cellSize * sqrt(3)/2, cellSize * 3/2);

	createCanvas(600, 600);

	// Populate list
	for(var r = 0; r < h; r++) {
		for(var q = qRange(r).min; q <= qRange(r).max; q++) {
			cells.push(new Cell(q, r));
		}
	}
	generateField();
}

function generateField() {
	var randList = []
	for(var i = 0; i < cells.length; i++) {
		randList[i] = i;
	}
	for(var i = 0; i < randList.length; i++) {
		var randNum = floor(random(1) * cells.length);
		var temp = randList[i];
		randList[i] = randList[randNum];
		randList[randNum] = temp;
	}

	for(var i = 0; i < numMines; i++) {
		cells[randList[i]].type = 9; // Mine
	}

	for(var i = 0; i < cells.length; i++) {
		for(var j = 0; j < 6; j++) {
			var neighbor = cells[i].neighbor(j);
			if(neighbor !== undefined && neighbor.type === 9 && cells[i].type !== 9) {
				cells[i].type++;
			}
		}
	}
}

function draw() {
	background(51);
	var axial = screenToAxial(mouseX, mouseY);
	for(var i = 0; i < cells.length; i++) {
		// Highlight cells on mouse hover if they aren't already revealed
		if(!cells[i].revealed) {
			if(cells[i].r === axial.r && cells[i].q === axial.q) {
				cells[i].c = 200;
			} else {
				cells[i].c = 127;
			}
		}

		cells[i].draw();
	}
}

function mouseReleased() {
	var index = axialToIndex(screenToAxial(mouseX, mouseY));
	// console.log(index);
	if(index !== undefined) {
		cells[index].reveal();
	}
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
	if(axial.r < 0 || axial.r >= h ||
	 axial.q < qRange(axial.r).min || axial.q > qRange(axial.r).max) {
		return undefined;
	} else {
		return row * w + col;
	}
}

// Returns the max & min 'q' for a given row
function qRange(r) {
	return {min: -floor(r / 2), max: w - floor(r / 2) - 1};
}

function resetGame() {
	// Reset the game
	console.log("Resetting...");
	generateField();
}
