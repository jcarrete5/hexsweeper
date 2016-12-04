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
	}

	this.reveal = function() {
		this.revealed = true;
	}
}
