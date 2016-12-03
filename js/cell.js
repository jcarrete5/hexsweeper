function Cell(x, y) {
	this.center = createVector(x, y);
	this.size = 15;

	this.draw = function() {
		fill(127);
		stroke(0);
		beginShape();
		for(var i = 0; i < 6; i++) {
			var angle = (PI/3) * i + PI/6;
			vertex(this.center.x + this.size * cos(angle), this.center.y + this.size * sin(angle));
		}
		endShape(CLOSE);
	}
}
