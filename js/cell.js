var neighborMap = [
	{q:1, r:0},
	{q:1, r:-1},
	{q:0, r:-1},
	{q:-1, r:0},
	{q:-1, r:1},
	{q:0, r:1}
]


function Cell(q, r) {
	this.q = q;
	this.r = r;
	this.c = 127;
	this.center = qBasis.copy().mult(this.q).add(rBasis.copy().mult(this.r));
	this.revealed = false;
	this.type = 0;

	this.draw = function() {
		fill(this.c);
		stroke(0);

		beginShape();
		for(var i = 0; i < neighborMap.length; i++) {
			var angle = (PI/3) * i + PI/6;
			vertex(cellOffset + this.center.x + cellSize * cos(angle), cellOffset + this.center.y + cellSize * sin(angle));
		}
		endShape(CLOSE);

		if(this.revealed && this.type !== 0) {
			var x = this.center.x + cellOffset - imageSize / 2;
			var y = this.center.y + cellOffset - imageSize / 2;
			image(assets[this.type], x, y, imageSize, imageSize);
		}
	}

	this.neighbor = function(dir) {
		var nOffset = neighborMap[dir];
		var axial = {q: this.q + nOffset.q, r: this.r + nOffset.r};
		var index;
		if(index = axialToIndex(axial)) {
			return cells[index];
		} else {
			return undefined;
		}
	}

	this.reveal = function() {
		if(this.revealed) return;
		this.revealed = true;
		this.c = 200;
		if(this.type == 0) {
			for(var j = 0; j < neighborMap.length; j++) {
				var neighbor = this.neighbor(j);
				if(neighbor) {
					neighbor.reveal();
				}
			}
		}
	}
}
