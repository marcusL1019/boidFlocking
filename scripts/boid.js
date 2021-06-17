class Boid {
	constructor(boid) {
		this.id = boid.id;
		this.x = boid.x;
		this.y = boid.y;
		this.radius = boid.radius;
		this.color = boid.color;
		this.vx = Math.random() * 10 - 5;
		this.vy = Math.random() * 10 - 5;
	}

	//calls flock() function to update boid variables,
	//then draws boid on canvas
	update() {
		this.flock();
		this.drawBoid();
	}

	//call force calculation functions and apply force
	//to boid
	flock() {
		this.cohesion(boid);
		this.separate(boid);
		this.align(boid);
		this.speedLimit();
		this.edgeBounce();

		this.x += this.vx;
		this.y += this.vy;
	}

	//draw boid in canvas
	drawBoid() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	}

	//calculate distance between this boid (x1, y1) and
	//another boid (x2, y2)
	distance(x1, y1, x2, y2) {
		return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	}

	//calculates alignment force between boid and
	//another boid
	align(boid) {
		const alignCo = 0.05;
		let dx = 0;
		let dy = 0;
		let count = 0;

		for (var i = 0; i < boid.length; i++) {
			if (boid[i].id !== this.id) {
				if (this.distance(this.x, this.y, boid[i].x, boid[i].y) < visualRange) {
					dx += boid[i].vx;
					dy += boid[i].vy;
					count++;
				}
			}
		}

		if (count) {
			dx = dx / count;
			dy = dy / count;
			this.vx += (dx - this.vx) * alignCo * Align;
			this.vy += (dy - this.vy) * alignCo * Align;
		}
	}

	//calculate force so boid moves toward center of mass
	//of boids within visual range
	cohesion(boid) {
		let cohesionCo = 0.008;
		let count = 0;

		let dx = 0;
		let dy = 0;
		for (var i = 0; i < boid.length; i++) {
			if (this.distance(this.x, this.y, boid[i].x, boid[i].y) < visualRange) {
				dx += boid[i].x;
				dy += boid[i].y;
				count++;
			}
		}

		if (count) {
			dx = dx / count;
			dy = dy / count;
			this.vx += (dx - this.x) * cohesionCo * Cohesion;
			this.vy += (dy - this.y) * cohesionCo * Cohesion;
		}
	}

	//calculate force so boid avoids collision with
	//other boids
	separate(boid) {
		const separateCo = 0.05;
		const separationDistance = 20;
		let dx = 0;
		let dy = 0;

		for (var i = 0; i < boid.length; i++) {
			if (boid[i].id !== this.id) {
				if (
					this.distance(this.x, this.y, boid[i].x, boid[i].y) <
					separationDistance
				) {
					dx += this.x - boid[i].x;
					dy += this.y - boid[i].y;
				}
			}
		}

		this.vx += dx * separateCo * Separation;
		this.vy += dy * separateCo * Separation;
	}

	//if boids get close enough to edge, a turning force
	//is added so they will gradually turn away
	edgeBounce() {
		let margin = 100;

		if (this.x < margin) {
			this.vx += turnCo;
		}
		if (this.x > canvas.width - margin) {
			this.vx -= turnCo;
		}
		if (this.y < margin) {
			this.vy += turnCo;
		}
		if (this.y > canvas.height - margin) {
			this.vy -= turnCo;
		}
	}

	//limit the speed that boids can fly at
	speedLimit() {
		const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

		if (speed > speedLimit) {
			this.vx = (this.vx / speed) * speedLimit;
			this.vy = (this.vy / speed) * speedLimit;
		}
	}
}
