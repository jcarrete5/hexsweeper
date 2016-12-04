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
		for(var i = 0; i < 6; i++) {
			var angle = (PI/3) * i + PI/6;
			vertex(cellOffset + this.center.x + cellSize * cos(angle), cellOffset + this.center.y + cellSize * sin(angle));
		}
		endShape(CLOSE);

		if(this.revealed) {
			var offset = imageSize / 2 - cellOffset;
			switch(this.type) {
				case 1:
					image(assets.one, this.center.x - offset, this.center.y - offset, imageSize, imageSize);
					break;
				case 2:
					image(assets.two, this.center.x - offset, this.center.y - offset, imageSize, imageSize);
					break;
				case 3:
					image(assets.three, this.center.x - offset, this.center.y - offset, imageSize, imageSize);
					break;
				case 4:
					image(assets.four, this.center.x - offset, this.center.y - offset, imageSize, imageSize);
					break;
				case 5:
					image(assets.five, this.center.x - offset, this.center.y - offset, imageSize, imageSize);
					break;
				case 6:
					image(assets.six, this.center.x - offset, this.center.y - offset, imageSize, imageSize);
					break;
				case 9:
					image(assets.mine, this.center.x - offset, this.center.y - offset, imageSize, imageSize);
					break;
			}
		}
	}

	this.neighbor = function(dir) {
		var nOffset = neighborMap[dir];
		var axial = {q: this.q + nOffset.q, r: this.r + nOffset.r};
		var index;
		if(index = axialToIndex(axial)) {
			return cells[axialToIndex(axial)];
		} else {
			return undefined;
		}
	}

	this.reveal = function() {
		this.revealed = true;
		
	}
}
