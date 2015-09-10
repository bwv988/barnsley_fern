// fern.js - Barnsley fern
// RS10092015

"use strict";

// Define the affine transformation parameters.
var A1 = math.matrix([[0.85, 0.04], [-0.04, 0.85]]);
var A2 = math.matrix([[0.2, -0.26], [0.23, 0.22]]);
var A3 = math.matrix([[0.15, 0.28], [0.26, 0.24]]);
var A4 = math.matrix([[0, 0], [0, 0.16]]);

var b1 = math.matrix([0, 1.6]);
var b2 = math.matrix([0, 1.6]);
var b3 = math.matrix([0, 0.44]);
var b4 = math.matrix([0, 0]);

// Probabilities
var p = [0.85, 0.92, 0.99, 1.00];

// Transformation calculations.
function trans1(vec) {
    return(math.multiply(A1, vec) + b1);
}

function trans2(vec) {
    return(math.multiply(A2, vec) + b2);
}

function trans3(vec) {
    return(math.multiply(A3, vec) + b3);
}

function trans4(vec) {
    return(math.multiply(A4, vec) + b4);
}


function fern_point(vec) {
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

function setup() {
    background(0);
}

function draw() {
    // Initial values.
    var vec = math.matrix([0.5, 0.5]);
    var iter = 10;

    while(iter > 0) {
        console.log(vec);
        vec = fern_point(vec);
        iter--;
    }
}
