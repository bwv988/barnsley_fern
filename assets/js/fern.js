// fern.js - Barnsley fern
// RS10092015

"use strict";

var SCREENX = 800;
var SCREENY = 800;
var SCALE = 70;
var MAX_ITER = 5000;

// Define the affine transformation parameters.
var A = new Array(
    math.matrix([
        [0.85, 0.04],
        [-0.04, 0.85]
    ]),
    math.matrix([
        [0.2, -0.26],
        [0.23, 0.22]
    ]),
    math.matrix([
        [-0.15, 0.28],
        [0.26, 0.24]
    ]),
    math.matrix([
        [0, 0],
        [0, 0.16]
    ])
);

var b = new Array(
    math.matrix([0, 1.6]), 
    math.matrix([0, 1.6]),
    math.matrix([0, 0.44]),
    math.matrix([0, 0])
);

// Probabilities
var p = [0.85, 0.92, 0.99, 1.00];

// Transformation calculation
function trans(i, vec) {
    return(math.add(math.multiply(A[i], vec), b[i]));
}

function transform_point(vec) {
    var r = math.random();

    if (r < p[0]) {
        return(trans(0, vec));
    } else if (r < p[1]) {
        return(trans(1, vec));
    } else if (r < p[2]) {
        return(trans(2, vec));
    } else {
        return(trans(3, vec));
    }
}


function pic_col(iter, max_iter) {
    var COLS = new Array(
        color(4, 91, 0),
        color(9, 183, 0),
        color(12, 249, 0),
        color(90, 255, 81)
    );
    
    var p = iter / max_iter;
    
    if (p < 0.25) {
        stroke(COLS[0]);
    } else if (p < 0.5) {
        stroke(COLS[1]);
    } else if (p < 0.75) {
        stroke(COLS[2]);
    } else {
        stroke(COLS[3]);
    }
}

function draw_points(screenx, screeny) {
    // Initial values.
    var centerx = screenx / 2;
    var centery = screeny;
    var iter = MAX_ITER;
    var vec = math.matrix([0, 0]);
    
    while(iter > 0) {
        var v = vec.valueOf();
        pic_col(iter, MAX_ITER);
        point(centerx + SCALE * v[0], centery - SCALE * v[1]);
        vec = transform_point(vec);
        iter--;
    }
}


// Main p5.js functions.
function setup() {
    createCanvas(SCREENX, SCREENY);
    background(0);
}

function draw() {
    draw_points(SCREENX, SCREENY);
    
    // Stop execution.
    noLoop();
}
