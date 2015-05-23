$(document).ready(function () {
    var scene = new Scene();
    scene.highBoundX = $('#myCanvas').width();
    scene.highBoundY = $('#myCanvas').height();
    console.log(scene);
    var ge = new GravEngine(scene);
    var intervalID;
    $('#run').click(function () {         
        var circle = GetNewCircle();        
        var element = document.getElementById("myCanvas");
        var ctx = element.getContext('2d');
        console.log(circle);
        intervalID = setInterval(function () {
//          // console.log("go");
            var dt = 0.1;
          var radius = 4;
          //przesuniecie
            ge.move(circle, dt);
            DrawCircle(element,ctx,
                circle.pos.x,element.height - circle.pos.y,radius);
           console.log(circle.pos.x+ " "+circle.pos.y);
        }, 50);
        //  DrawCircle(element,ctx,20,50,2);
    });
    $('#stop').click(function () {
        clearInterval(intervalID);
    });
});
function GravEngine(scene) {
    this.scene = scene;
    this.obj = new Circle(100, 100, 0, 20, 0, -10);
    this.boundCondition = function (obj) {
        if ((obj.pos.x < scene.lowBoundX
                || obj.pos.x > scene.highBoundX)
                && obj.collisionX === false) {
            obj.changeSpeedX();
            obj.collisionX = true;
        } else {
            obj.collisionX = false;
        }
        if ((obj.pos.y < scene.lowBoundY
                || obj.pos.y > scene.highBoundY)
                && obj.collisionY === false) {
            obj.changeSpeedY();
            obj.collisionY = true;
        } else {
            obj.collisionY = false;
        }
    };
    this.move = function (obj, dt) {
        //console.log(obj);
        obj.speed.x += obj.acc.x * dt;
        obj.speed.y += obj.acc.y * dt;
        obj.pos.x += obj.speed.x * dt;
        obj.pos.y += obj.speed.y * dt;
        this.boundCondition(obj);
    };
}
function Scene() {
    this.lowBoundX = 0;
    this.lowBoundY = 0;
    this.highBoundX = 300;
    this.highBoundY = 500;
}
function Pair(a, b) {
    this.x = a;
    this.y = b;
}

function Circle(x, y, vx, vy, gx, gy) {
    this.collisionX = false;
    this.collisionY = false;
    this.pos = new Pair(x, y);
    this.speed = new Pair(vx, vy);
    this.acc = new Pair(gx, gy);

    this.changeSpeedX = function () {
        this.speed.x = -this.speed.x;
    };
    this.changeSpeedY = function () {
        this.speed.y = -this.speed.y;
    };
}
function DrawCircle(element, canvas, x, y, radius) {
    canvas.clearRect(0, 0, element.width, element.height);
    canvas.beginPath();
    canvas.arc(x, y, radius, 0, 2 * Math.PI, false);
    //canvas.lineWith = 1;
    //canvas.strokeStyle = '#003300';
    canvas.stroke();
}

function GetNewCircle(){
    var x0 = isNaN(parseInt($('#x').val()))?50:parseInt($('#x').val());
    var y0 = isNaN(parseInt($('#y').val()))?50:parseInt($('#y').val());
    var vx0 = isNaN(parseInt($('#vx').val()))?0:parseInt($('#vx').val());
    var vy0 = isNaN(parseInt($('#vy').val()))?0:parseInt($('#vy').val());
    return new Circle(x0,y0,vx0,vy0,0,-10);
}

