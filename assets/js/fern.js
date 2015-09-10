// fern.js - Barnsley fern
// RS10092015

"use strict";

// Define the affine transformation parameters.
var A1 = math.matrix([[0.85, 0.04], [-0.04, 0.85]]);
var A2 = math.matrix([[0.2, -0.26], [0.23, 0.22]]);
var A3 = math.matrix([[-0.15, 0.28], [0.26, 0.24]]);
var A4 = math.matrix([[0, 0], [0, 0.16]]);

var b1 = math.matrix([0, 1.6]);
var b2 = math.matrix([0, 1.6]);
var b3 = math.matrix([0, 0.44]);
var b4 = math.matrix([0, 0]);

// Probabilities
var p = [0.85, 0.92, 0.99, 1.00];

// Transformation calculations.
// FIXME: There must be a smarter way of doing this in JS!
function trans1(vec) {
    return(math.add(math.multiply(A1, vec), b1));
}

function trans2(vec) {
    return(math.add(math.multiply(A2, vec), b2));
}

function trans3(vec) {
    return(math.add(math.multiply(A3, vec), b3));
}

function trans4(vec) {
    return(math.add(math.multiply(A4, vec), b4));
}


function transform_point(vec) {
    var r = math.random();

    if (r < p[0]) {
        return(trans1(vec));
    } else if (r < p[1]) {
        return(trans2(vec));
    } else if (r < p[2]) {
        return(trans3(vec));
    } else {
        return(trans4(vec));
    }
}


function pic_col(iter, max_iter) {
    var COL1 = color(4, 91, 0);
    var COL2 = color(9, 183, 0);
    var COL3 = color(12, 249, 0);
    var COL4 = color(90, 255, 81);
    
    var p = iter / max_iter;
    
    if (p < 0.25) {
        stroke(COL1);
    } else if (p < 0.5) {
        stroke(COL2);
    } else if (p < 0.75) {
        stroke(COL3);
    } else {
        stroke(COL4);
    }
}

function draw_points() {
    // Initial values.
    
    var SCALE = 50;
    var CENTERX = 400;
    var CENTERY = 600;
    var MAX_ITER = 100000;
   
    var vec = math.matrix([0, 0]);
    var iter = MAX_ITER;
  

    while(iter > 0) {
        var v = vec.valueOf();
        pic_col(iter, MAX_ITER);
        point(CENTERX + SCALE * v[0], CENTERY - SCALE * v[1]);
        vec = transform_point(vec);
        iter--;
    }
}


// Main p5.js functions.
function setup() {
    createCanvas(800, 600)
    background(0);
    draw_points();
}

function draw() {

}
