//declare variables
let canvas = document.getElementById('boidCanvas');
let c = canvas.getContext('2d');
let numBoids;
let screenWidth;
let screenHeight;
let radius;
let visualRange;
let speedLimit;
let turnCo;

let colors = [
	'#2B45D1',
	'#EF1D4F',
	'#37F29A',
	'#E2E2E2',
	'#912EE2',
	'#C76126',
	'#D3C720',
	'#17BFC8',
];

let boid = [];

//boid rule slider functionality
let alignSlider = document.getElementById('alignment');
let Align = alignSlider.value;
alignSlider.oninput = function () {
	Align = this.value;
};

let cohesionSlider = document.getElementById('cohesion');
let Cohesion = cohesionSlider.value;
cohesionSlider.oninput = function () {
	Cohesion = this.value;
};

let separationSlider = document.getElementById('separation');
let Separation = separationSlider.value;
separationSlider.oninput = function () {
	Separation = this.value;
};

//detect if mobile browser, set variables if mobile or not
if (
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	)
) {
	numBoids = 75;
	screenWidth = 1;
	screenHeight = 1.25;
	radius = 2;
	visualRange = 50;
	speedLimit = 5;
	turnCo = 0.25;
} else {
	numBoids = 150;
	screenWidth = 0.5;
	screenHeight = 0.66;
	radius = 3;
	visualRange = 75;
	speedLimit = 10;
	turnCo = 0.5;
}

//set canvas dimensions
canvas.width = window.innerWidth * screenWidth;
canvas.height = canvas.width * screenHeight;

//adjust canvas dimensions on window resize
window.addEventListener('resize', () => {
	canvas.width = window.innerWidth * screenWidth;
	canvas.height = canvas.width * screenHeight;
});

let size = {
	width: canvas.clientWidth,
	height: canvas.clientHeight,
};

//create boids with random x,y coords and colors, then add
//to boid array
function createBoids() {
	for (var i = 0; i < numBoids; i++) {
		var x = Math.random() * size.width;
		var y = Math.random() * size.height;

		boid.push(
			new Boid({
				id: i,
				x: x,
				y: y,
				radius: radius,
				color: colors[Math.ceil(Math.random() * colors.length)],
			})
		);
	}
}

function animate() {
	//requestAnimationFrame(animate);

	c.clearRect(0, 0, size.width, size.height);
	for (var j = 0; j < boid.length; j++) {
		boid[j].update();
	}

	requestAnimationFrame(animate);
}

createBoids();
animate();
