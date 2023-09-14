var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var stepCtr = document.getElementById("step");
var bestText = document.getElementById("best");
var targetText = document.getElementById("target");
var costText = document.getElementById("cost");
var r2Text = document.getElementById("r2");
var graph = document.getElementById("graph");
var sim = document.getElementById("sim");
var graphCtx = graph.getContext("2d");
var simCtx = sim.getContext("2d");
var GRAPH_WIDTH = graph.width = 330;
var GRAPH_HEIGHT = graph.height = 330;
var WIDTH = sim.width = 330;
var HEIGHT = sim.height = 330;
// Get a number in range [0, factor)
function rand(factor) {
    return Math.random() * factor;
}
// Get an int in range [min, max)
function randInt(min, max) {
    return Math.floor(rand(max - min) + min);
}
// Get a number in range (-factor, factor)
function randSigned(factor) {
    if (Math.random() < 0.5) {
        return -rand(factor);
    }
    return rand(factor);
}
function rgb(r, g, b) {
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
// Round to two decimal places
function twoplaces(x) {
    return Math.round(x * 100) / 100;
}
function arrayMax(array) {
    var max = Number.MIN_VALUE;
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var x = array_1[_i];
        if (max < x) {
            max = x;
        }
    }
    return max;
}
function arrayMin(array) {
    var min = Number.MAX_VALUE;
    for (var _i = 0, array_2 = array; _i < array_2.length; _i++) {
        var x = array_2[_i];
        if (min > x) {
            min = x;
        }
    }
    return min;
}
function getBaseErr(dataset) {
    var sum = dataset.reduce(function (a, b) { return a + b.y; }, 0);
    var avg = sum / dataset.length;
    return dataset.reduce(function (a, b) { return a + Math.pow(avg - b.y, 2); }, 0);
}
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Polynomial = /** @class */ (function () {
    function Polynomial(a, b, remaining) {
        this.coefficients = __spreadArray([a, b], remaining, true);
        this.n_coefs = this.coefficients.length;
    }
    Polynomial.prototype.getRemaining = function () {
        return this.coefficients.slice(2);
    };
    Polynomial.random = function (n_coefs, factor) {
        var a = randSigned(factor);
        var b = randSigned(factor);
        var n_remaining = n_coefs - 2;
        var remaining = new Array(n_remaining);
        for (var i = 0; i < n_remaining; i++) {
            remaining[i] = randSigned(factor);
        }
        return new Polynomial(a, b, remaining);
    };
    Polynomial.zero = function (n_coefs) {
        var remaining = new Array(n_coefs - 2);
        for (var i = 0; i < n_coefs - 2; i++)
            remaining[i] = 0;
        return new Polynomial(0, 0, remaining);
    };
    Polynomial.prototype.a = function () { return this.coefficients[0]; };
    Polynomial.prototype.b = function () { return this.coefficients[1]; };
    Polynomial.prototype.valueAt = function (x) {
        var y = 0;
        for (var i = 0; i < this.n_coefs; i++) {
            y += this.coefficients[i] * Math.pow(x, this.n_coefs - 1 - i);
        }
        return y;
    };
    Polynomial.prototype.copy = function () {
        return new Polynomial(this.coefficients[0], this.coefficients[1], this.coefficients.slice(2));
    };
    Polynomial.prototype.toString = function () {
        var out = "y = " + twoplaces(this.coefficients[0]) + "x^" + (this.n_coefs - 1);
        for (var i = 1; i < this.n_coefs; i++) {
            if (this.coefficients[i] == 0) {
                continue;
            }
            else if (this.coefficients[i] < 0) {
                out += " - " + twoplaces(Math.abs(this.coefficients[i]));
            }
            else {
                out += " + " + twoplaces(this.coefficients[i]);
            }
            if (i < this.n_coefs - 2) {
                out += "x^" + (this.n_coefs - 1 - i);
            }
            else if (i == this.n_coefs - 2) {
                out += "x";
            }
        }
        return out;
    };
    return Polynomial;
}());
var Particle = /** @class */ (function () {
    function Particle(factor) {
        this.factor = factor;
        this.value = Polynomial.random(Particle.n_coefs, factor);
        this.velocity = Polynomial.random(Particle.n_coefs, factor * 0.1);
        this.lBest = null;
        this.lBestCost = Number.MAX_VALUE;
        this.color = rgb(randInt(50, 250), randInt(50, 250), randInt(50, 250));
    }
    Particle.prototype.scale = function (value) {
        return value / (12 * this.factor) + 1 / 2;
    };
    Particle.prototype.getPosition = function (width, height) {
        var x = this.scale(this.value.a()) * width;
        var y = (1 - this.scale(this.value.b())) * height;
        return new Point(x, y);
    };
    Particle.prototype.updateLBest = function (dataset) {
        var cost = 0;
        for (var _i = 0, dataset_1 = dataset; _i < dataset_1.length; _i++) {
            var point = dataset_1[_i];
            var pred = this.value.valueAt(point.x);
            cost += Math.pow(pred - point.y, 2);
        }
        cost = Math.sqrt(cost);
        if (this.lBest === null || cost < this.lBestCost) {
            this.lBest = this.value.copy();
            this.lBestCost = cost;
        }
    };
    Particle.n_coefs = 4;
    return Particle;
}());
var Swarm = /** @class */ (function () {
    function Swarm(factor, n_datapoints, scale, noiseFactor, n_particles, n_steps) {
        this.gBest = null;
        this.gBestCost = Number.MAX_VALUE;
        this.rsquared = 0;
        this.substep = 0;
        this.step = 0;
        this.coefFactor = factor;
        this.target = new Particle(factor);
        targetText.innerText = "Target: " + this.target.value.toString();
        this.dataset = new Array(n_datapoints);
        for (var i = 0; i < n_datapoints; i++) {
            var x = randSigned(scale);
            var noise = randSigned(noiseFactor);
            var y = this.target.value.valueAt(x) + noise;
            this.dataset[i] = new Point(x, y);
        }
        this.baseErr = getBaseErr(this.dataset);
        this.particles = new Array(n_particles);
        for (var i = 0; i < n_particles; i++) {
            this.particles[i] = new Particle(5 * factor);
            this.particles[i].factor = factor;
        }
        this.n_steps = n_steps;
    }
    Swarm.prototype.getInertiaCoef = function () {
        return this.step / this.n_steps * (0.4 - 0.8) + 0.8;
    };
    Swarm.prototype.getAccelerationCoefLocal = function () {
        return this.step / this.n_steps * (0.5 - 2.5) + 2.5;
    };
    Swarm.prototype.getAccelerationCoefGlobal = function () {
        return 3 - this.getAccelerationCoefLocal();
    };
    Swarm.prototype.updateVelocities = function () {
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var particle = _a[_i];
            particle.updateLBest(this.dataset);
            if (this.gBest === null || particle.lBestCost < this.gBestCost) {
                this.gBest = particle.lBest.copy();
                this.gBestCost = particle.lBestCost;
            }
        }
        this.rsquared = 1 - (Math.pow(this.gBestCost, 2) / this.baseErr);
        for (var _b = 0, _c = this.particles; _b < _c.length; _b++) {
            var particle = _c[_b];
            for (var i = 0; i < Particle.n_coefs; i++) {
                var r1 = Math.random();
                var r2 = Math.random();
                var value = particle.value.coefficients[i];
                var diffLBest = particle.lBest.coefficients[i] - value;
                var diffGBest = this.gBest.coefficients[i] - value;
                particle.velocity.coefficients[i] = (this.getInertiaCoef() * particle.velocity.coefficients[i] +
                    this.getAccelerationCoefLocal() * r1 * diffLBest +
                    this.getAccelerationCoefGlobal() * r2 * diffGBest);
            }
        }
    };
    Swarm.prototype.doSubstep = function () {
        if (this.substep == 0) {
            this.step++;
            this.updateVelocities();
        }
        this.substep = (this.substep + 1) % Swarm.CYCLE;
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var particle = _a[_i];
            for (var i = 0; i < Particle.n_coefs; i++) {
                particle.value.coefficients[i] += particle.velocity.coefficients[i] * 1 / Swarm.CYCLE;
            }
        }
        return this;
    };
    Swarm.prototype.renderGraph = function (ctx) {
        var _a = ctx.canvas.getBoundingClientRect(), width = _a.width, height = _a.height;
        // Clear
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
        // Border
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, width, height);
        var xs = this.dataset.map(function (point) { return point.x; });
        var ys = this.dataset.map(function (point) { return point.y; });
        var x_lower = arrayMin(xs);
        var x_upper = arrayMax(xs);
        var y_lower = arrayMin(ys);
        var y_upper = arrayMax(ys);
        // Display each datapoint in the dataset and each corresponding gBest prediction
        for (var _i = 0, _b = this.dataset; _i < _b.length; _i++) {
            var point = _b[_i];
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc((point.x - x_lower) / (x_upper - x_lower) * width, (1 - (point.y - y_lower) / (y_upper - y_lower)) * height, 10, 0, Math.PI * 2);
            ctx.fill();
        }
        for (var x = x_lower; x < x_upper; x += (x_upper - x_lower) / 1000) {
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc((x - x_lower) / (x_upper - x_lower) * width, (1 - (this.gBest.valueAt(x) - y_lower) / (y_upper - y_lower)) * height, 4, 0, Math.PI * 2);
            ctx.fill();
        }
        return this;
    };
    Swarm.prototype.renderSwarm = function (ctx) {
        var _a = ctx.canvas.getBoundingClientRect(), width = _a.width, height = _a.height;
        // Clear
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
        // Border
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, ctx.canvas.width, height);
        // Display a point for the target
        var position = this.target.getPosition(width, height);
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(position.x, position.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke();
        // Display each particle
        for (var _i = 0, _b = this.particles; _i < _b.length; _i++) {
            var particle = _b[_i];
            var position_1 = particle.getPosition(width, height);
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(position_1.x, position_1.y, 10, 0, Math.PI * 2);
            ctx.fill();
        }
        return this;
    };
    // Main program loop
    Swarm.prototype.fullUpdate = function (graphCtx, simCtx) {
        if (this.step >= this.n_steps)
            return true;
        this.doSubstep().renderGraph(graphCtx).renderSwarm(simCtx);
        return false;
    };
    Swarm.CYCLE = 16;
    return Swarm;
}());
var nDataInput = document.getElementById("n_data");
var nParticlesInput = document.getElementById("n_particles");
var nStepsInput = document.getElementById("n_steps");
function getInitState() {
    var FACTOR = 50;
    var SCALE = 10;
    var NOISE_FACTOR = 5000;
    var n_data = parseInt(nDataInput.value);
    if (isNaN(n_data) || n_data < 2) {
        n_data = 50;
    }
    var n_particles = parseInt(nParticlesInput.value);
    if (isNaN(n_particles) || n_particles < 1) {
        n_particles = 100;
    }
    var n_steps = parseInt(nStepsInput.value);
    if (isNaN(n_steps) || n_steps < 1) {
        n_steps = 50;
    }
    return new Swarm(FACTOR, n_data, SCALE, NOISE_FACTOR, n_particles, n_steps);
}
// Initial program state
var swarm = getInitState();
setInterval(function () {
    if (swarm.fullUpdate(graphCtx, simCtx))
        return;
    stepCtr.innerText = "Step: " + swarm.step + "/" + swarm.n_steps;
    bestText.innerText = "Best: " + swarm.gBest.toString();
    costText.innerText = "Cost: " + twoplaces(swarm.gBestCost);
    r2Text.innerText = "R-squared (accuracy): " + twoplaces(swarm.rsquared);
}, 25);
var reset = document.getElementById("reset");
reset.onclick = function () {
    swarm = getInitState();
};
