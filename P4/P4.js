function setup() {
    "use strict";
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var m4 = twgl.m4;

    var slider1 = document.getElementById('slider1');
    slider1.value = 6;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 0;
    var slider4 = document.getElementById('slider4');
    slider4.value = 35;

    function moveToTx(x, y, z, Tx) {
        var loc = [x, y, z];
        var locTx = m4.transformPoint(Tx, loc);
        context.moveTo(locTx[0] + 425, -locTx[1] + 250);
    }

    function lineToTx(x, y, z, Tx) {
        var loc = [x, y, z];
        var locTx = m4.transformPoint(Tx, loc);
        context.lineTo(locTx[0] + 425, -locTx[1] + 250);
    }

    function mergeSort (arr) {
        if (arr.length === 1) {
            return arr
        }

        const middle = Math.floor(arr.length / 2)
        const left = arr.slice(0, middle) 
        const right = arr.slice(middle) 

        return merge(mergeSort(left),mergeSort(right))
    }

    function merge (left, right) {
        var arr = []
        var indexLeft = 0
        var indexRight = 0

        while (indexLeft < left.length && indexRight < right.length) {
            if (left[indexLeft].dist > right[indexRight].dist) {
                arr.push(left[indexLeft])
                indexLeft++
            } else {
                arr.push(right[indexRight])
                indexRight++
            }
        }

        return arr.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
    }



    function triangle(x, y, z, eye) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.center = [(x[0] + y[0] + z[0]) / 3, (x[1] + y[1] + z[1]) / 3, (x[2] + y[2] + z[2]) / 3];
        this.dist = Math.pow(this.center[0] - eye[0], 2) + Math.pow(this.center[1] - eye[1], 2) 
        + Math.pow(this.center[2] - eye[2], 2);
        this.clr = "#DAC9A6"; 
    }


    function drawTriangle(tri, Tx) {
        context.beginPath();
        context.strokeStyle = "#BDC0BA";
        context.fillStyle = tri.clr;
        moveToTx(tri.x[0], tri.x[1], tri.x[2], Tx);
        lineToTx(tri.y[0], tri.y[1], tri.y[2], Tx);
        lineToTx(tri.z[0], tri.z[1], tri.z[2], Tx);
        context.stroke();
        context.fill();
        context.closePath();
    }


    function drawPlanet(center, eye,r,g,b,moon) {

        var v1 = [center[0] + 40 * Math.sin(2 * angle1), center[1], center[2] + 40 * Math.cos(2 * angle1)];
        var v2 = [center[0] + 40 * Math.sin(2 * angle1 + Math.PI / 2), center[1], center[2] + 40 * Math.cos(2 * angle1 + Math.PI / 2)];
        var v3 = [center[0] + 40 * Math.sin(2 * angle1 + Math.PI), center[1], center[2] + 40 * Math.cos(2 * angle1 + Math.PI)];
        var v4 = [center[0] + 40 * Math.sin(2 * angle1 + Math.PI * 3 / 2), center[1], center[2] + 40 * Math.cos(2 * angle1 + Math.PI * 3 / 2)];
        var v5 = [center[0], center[1] + 50, center[2]];
        var v6 = [center[0], center[1] - 50, center[2]];

        var tris = [];
        tris.push(new triangle(v5, v1, v2, eye));
        tris.push(new triangle(v5, v3, v2, eye));
        tris.push(new triangle(v5, v3, v4, eye));
        tris.push(new triangle(v5, v1, v4, eye));
        tris.push(new triangle(v6, v1, v2, eye));
        tris.push(new triangle(v6, v3, v2, eye));
        tris.push(new triangle(v6, v3, v4, eye));
        tris.push(new triangle(v6, v1, v4, eye));

        var clr = [];
        for (var i = 0; i < 8; i++) {
            var r1 = r + (i-4) * ((254-r)/16);
            var g1 = g + (i-4) * ((254-g)/16);
            var b1 = b + (i-4) * ((254-b)/16);
            clr.push("rgb(" + r1 + ", " + g1 + ", " + b1 + ")");
        }

        for (var i = 0; i < tris.length; i++) {
            tris[i].clr = clr[i];
        }
        if(moon == 1)
        {
            tris= tris.concat(drawPlanet([center[0]-80 * Math.sin(-angle1),center[1]+ 80 * Math.cos(-angle1),center[2]], eye,119,66,141,0));
        }else if(moon == 2)
        {
            tris= tris.concat(drawPlanet([center[0],center[1]+80 * Math.sin(angle1),center[2]+ 80 * Math.cos(-angle1)], eye,93,172,129,1));
        }
        return tris;

    }


    function drawSun(eye) {
        var tris = [];
        var v1 = [200 * Math.sin(angle1), 200, 200 * Math.cos(angle1)];
        var v2 = [200 * Math.sin(angle1 + Math.PI / 2), 200, 200 * Math.cos(angle1 + Math.PI / 2)];
        var v3 = [200 * Math.sin(angle1 + Math.PI), 200, 200 * Math.cos(angle1 + Math.PI)];
        var v4 = [200 * Math.sin(angle1 + Math.PI * 3 / 2), 200, 200 * Math.cos(angle1 + Math.PI * 3 / 2)];
        var v5 = [200 * Math.sin(angle1), -200, 200 * Math.cos(angle1)];
        var v6 = [200 * Math.sin(angle1 + Math.PI / 2), -200, 200 * Math.cos(angle1 + Math.PI / 2)];
        var v7 = [200 * Math.sin(angle1 + Math.PI), -200, 200 * Math.cos(angle1 + Math.PI)];
        var v8 = [200 * Math.sin(angle1 + Math.PI * 3 / 2), -200, 200 * Math.cos(angle1 + Math.PI * 3 / 2)];

        tris.push(new triangle(v1, v2, v3, eye));
        tris.push(new triangle(v1, v4, v3, eye));
        tris.push(new triangle(v5, v6, v7, eye));
        tris.push(new triangle(v5, v8, v7, eye));

        tris.push(new triangle(v1, v8, v5, eye));
        tris.push(new triangle(v1, v8, v4, eye));
        tris.push(new triangle(v2, v7, v3, eye));
        tris.push(new triangle(v2, v7, v6, eye));

        tris.push(new triangle(v1, v2, v5, eye));
        tris.push(new triangle(v5, v2, v6, eye));
        tris.push(new triangle(v3, v4, v7, eye));
        tris.push(new triangle(v4, v7, v8, eye));

        var clr = [];
        for (var i = 0; i < 13; i++) {
            if (i % 2 == 0) {
                var r = 202 + (i - 6) * 5;
                var g = 122 + (i - 6) * 8;
                var b = 44 + (i - 6) * 10;
                clr.push("rgb(" + r + ", " + g + ", " + b + ")");
            } else {
                var r = 247 + (i - 6) * 1;
                var g = 92 + (i - 6) * 10;
                var b = 47 + (i - 6) * 10;
                clr.push("rgb(" + r + ", " + g + ", " + b + ")");
            }

        }
        var k = 0;
        for (var i = 0; i < tris.length; i++) {
            tris[i].clr = clr[i];
        }
        tris = tris.concat(drawPlanet([380 * Math.sin(-angle1), 0, 380 * Math.cos(-angle1)], eye,129,199,212,0));
        tris = tris.concat(drawPlanet([290 * Math.sin(-angle1 - Math.PI * 3 / 2), 290 * Math.cos(-angle1 + Math.PI * 3 / 2), 0], eye,130,102,58,1));
        tris = tris.concat(drawPlanet([0,300 * Math.sin(-angle1 - Math.PI * 3 / 2), 300 * Math.cos(angle1 + Math.PI * 3 / 2)], eye,232,182,71,2));
        return tris;
    }

    var angle1 = 0;

    function draw() {
        var spd = slider1.value;
        var tris = [];
        canvas.width = canvas.width;
        // hack to clear the canvas fast
        context.fillStyle = "#0F2540";
        context.fillRect(0, 0, 850, 500);
        angle1 += 0.001 * Math.PI % (2 * Math.PI) * spd;
        angle1 = angle1 % (2 * Math.PI);
        var angle2 = slider2.value * 0.01 * Math.PI;
        var axis = [1, 1, 1];


        var angle3 = slider3.value * 0.01 * Math.PI;
        var fov = Math.PI/18000 * (slider4.value);
        //Perspective algorithm.
        var projM = m4.perspective(fov, 1, 0.1, 100);
       // var eye = [100 + 500 * Math.cos(angle2), 100 + 200 * Math.sin(angle4), 100 + 500 * Math.sin(angle2)];
        var eye = [700 * Math.cos(angle3), 400* Math.sin(angle2), 700 * Math.sin(angle2)];
        var target = [0, 0, 0];
        var up = [0, 1, 0];
        var Tcamera = m4.inverse(m4.lookAt(eye, target, up));
        Tcamera = m4.multiply(Tcamera, projM);
        var tris = [];

        tris = drawSun(eye);
        tris = mergeSort(tris);
        for(var i =0; i < tris.length; i++)
        {
            drawTriangle(tris[i],Tcamera)
        }
        window.requestAnimationFrame(draw);
    }

    slider1.addEventListener("input", draw);
    slider2.addEventListener("input", draw);
    slider3.addEventListener("input", draw);
    slider4.addEventListener("input", draw);
    window.requestAnimationFrame(draw);

}

window.onload = setup;






function mergeSort (arr) {
        if (arr.length === 1) {
            return arr
        }
        const middle = Math.floor(arr.length / 2)
        const left = arr.slice(0, middle)
        const right = arr.slice(middle)
        return merge(
            mergeSort(left),
            mergeSort(right)
        )
    }

    function merge (left, right) {
        var result = []
        var front = 0
        var next = 0
        while (front < left.length && next < right.length) {
            if (left[front].dist > right[next].dist) {
                result.push(left[front])
                front++
            } else {
                result.push(right[next])
                next++
            }
        }
        return result.concat(left.slice(front)).concat(right.slice(next))
    }




    function bubbleSort(a)
{
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}