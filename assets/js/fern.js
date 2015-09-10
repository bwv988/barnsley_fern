// fern.js - Barnsley fern
// RS10092015

"use strict";

var p5_app = function(p) {
    var SCREENX = 800;
    var SCREENY = 800;
    var SCALE = 70;
    var MAX_ITER = 200000;

    var COLS = [
        p.color(4, 91, 0),
        p.color(9, 183, 0),
        p.color(12, 249, 0),
        p.color(90, 255, 81)
    ];

    // Define the affine transformation parameters.
    var A = [
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
    ];

    var b = [
        math.matrix([0, 1.6]),
        math.matrix([0, 1.6]),
        math.matrix([0, 0.44]),
        math.matrix([0, 0])
    ];

    // Probabilities
    var prob = [0.85, 0.92, 0.99, 1.00];

    // Initial values.
    var cfg = {
        'centerx' : SCREENX / 2,
        'centery' : SCREENY,
        'iter' : MAX_ITER,
        'vec' : math.matrix([0, 0])
    };

    function get_index(value, vals) {
        var ret;
        for (var i = 0; i < vals.length; ++i) {
            ret = i;
            if (value < vals[i]) {
                break;
            }
        }
        return ret;
    }

    // Transformation calculation
    function trans(i, vec) {
        return(math.add(math.multiply(A[i], vec), b[i]));
    }

    // Apply the transformation.
    function transform_point(vec) {
        var func_system = get_index(math.random(), prob);
        return(trans(func_system, vec));
    }

    function pick_col(iter, max_iter) {
        var vals = [0.25, 0.5, 0.75, 1];
        var pr = iter / max_iter;
        p.stroke(COLS[get_index(pr, vals)]);
    }
    
    function update_frame() {
        var v = cfg.vec.valueOf();
        pick_col(cfg.iter, MAX_ITER);
        p.point(cfg.centerx + SCALE * v[0], cfg.centery - SCALE * v[1]);
        cfg.vec = transform_point(cfg.vec);
        cfg.iter--;    
    }

    // This is for drawing the entire IFS at once.
    function draw_all() {
        while(cfg.iter > 0) {
            update_frame();
        }    
    }
    
    // Main p5.js functions.
    p.setup = function() {
        p.createCanvas(SCREENX, SCREENY);
        p.background(0);
        p.frameRate(60);
        
        //draw_all();
    }

    p.draw = function() {
        if (cfg.iter === 0) {
            // Stop drawing after MAXITER is reached.
            return false;
        }
        update_frame();
    }
}
 
var myp5 = new p5(p5_app);
