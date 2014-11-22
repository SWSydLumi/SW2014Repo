var serialPort = require("serialport");
var Leap = require("leapjs");
var SerialPort = serialPort.SerialPort; // localize object constructor

// Store frame for motion functions
var previousFrame = null;
var paused = false;
var pauseOnGesture = false;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

var sp = new SerialPort("COM3", {
  baudrate: 9600
});

sp.on("open", function () {
	Leap.loop(controllerOptions, function(frame) {
	  if (paused) {
		return; // Skip this update
	  }
	  var has_click = false
	  for( var i = 0; i < frame.fingers.length; i++){
		if(frame.pointables[i].extended == true){
			var has_click = true;
		}
	  }
	  if(has_click) {
		sp.write("a\n");
		console.log('raising LED 1');
	  }else {
		sp.write("d\n");
		console.log('raising LED 2');
	  }

	  // Store frame for motion functions
	  previousFrame = frame;
	})
});
