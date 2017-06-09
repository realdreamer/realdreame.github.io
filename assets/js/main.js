'use strict';
(function () {
  window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60)}; // simulate calling code 60

  window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || function(requestID){clearTimeout(requestID)};

  let height = window.innerHeight;
  let width = window.innerWidth;
  var startTime;
  let shapesCount = 0;
  const shapeGenerator = function ( ) {
    console.log('Generating...!');
    let shapes = [];
    for(var i = 0; i < 1; i++ ){
      shapes.push(new mojs.ShapeSwirl({
        className: 'circle'+shapesCount,
        shape: 'circle',
        radius: 'rand(2, 6)',
        fill: '#fff',
        opacity: 'rand(.3, .8)',
        isShowStart: false,
        top: 0,
        left: 'rand(0, 100%)',
        y: { [height + 50] : -5 },
        duration: 'rand(60000, 4000)',
        isShowEnd: false,
        delay: 'rand(100, 6000)',
        swirlSize: 'rand(10, 40)',
        swirlFrequency: 'rand(3, 15)',
        isForce3d: true,
        onComplete(isForward, yoyo) {
          var el = document.querySelector('.circle'+shapesCount);
          el && el.remove();
        }
      }).play());
      shapesCount++;
    }
  }

  const generateParticles = function generateParticles (timeStamp) {
    var timeStamp = timeStamp || new Date().getTime();
    var timeDiff = Math.abs( ( timeStamp - startTime ) / 6000 );
    // if ( timeStamp === startTime || timeDiff > 1 && ( (timeDiff % 2) === 0 ) ) {
      // shapeGenerator();
    // }
    requestAnimationFrame(function (timeStamp){
      generateParticles(new Date().getTime());
    });
  };

  requestAnimationFrame(function () {
    startTime = new Date().getTime();
    generateParticles(startTime);
  });



  // const swirl = new mojs.ShapeSwirl({
  //   fill: '#fff',
  //   top: 0,
  //   y: { [height] : -5 },
  //   duration: 40000,
  //   swirlSize: 35,
  //   swirlFrequency: 5,
  //   easing: 'cubic.out'
  //   // degreeShift: 45
  // }).play();

  var _windowWidth = window.innerWidth,
      _windowHeight = window.innerHeight,
      top = '-'+( window.innerHeight + 20 )+'px';

  TweenLite.ticker.fps(30);

  var canvas = document.querySelector('#myCanvas');
  canvas.width = _windowWidth;
  canvas.height = _windowHeight;
  var stage = new createjs.Stage(canvas),
      circle = new createjs.Shape(),
      g = circle.graphics;

  g.beginFill("#fff");
  g.drawCircle(Math.floor(Math.random()*(_windowWidth-5+1)+5), _windowHeight + 10, 4);
  circle.alpha = .5;
  stage.addChild(circle);
  stage.update();
  var _count = 0;
  var vx = 0;

  stage.addEventListener('click', function (evt) {
    console.log(evt);
  });

  var myFunction = function () {
    if ( _count % 5 === 0 ) {
      circle = new createjs.Shape(),
      g = circle.graphics;
      g.beginFill("#fff");
      g.drawCircle(Math.floor(Math.random()*(_windowWidth-5+1)+5), _windowHeight + 10, Math.floor(Math.random() * (5 - 2 + 1) + 2));
      circle.alpha = Math.floor(Math.random()*(.6 - .4 + .5) + .4);
      stage.addChild(circle);
    }
    vx = Math.floor(Math.random() * (400 - 2 + 1) + 2);
    TweenLite.to(circle, Math.floor(Math.random()*(80-45+1)+45), { y: top, x: "+=vx", ease: Power0.easeNone } );
    stage.update();
    _count++;
  };

  TweenLite.ticker.addEventListener("tick", myFunction, this);
})();
