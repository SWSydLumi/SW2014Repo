var serialPort = require("serialport");
var Leap = require("leapjs");
var SerialPort = serialPort.SerialPort; // localize object constructor

// Store frame for motion functions
var previousFrame = null;
var paused = false;
var pauseOnGesture = false;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};
var has_click = false
var LED1Status = false;
var LED2Status = false;
var pos = "l";
var height = 0;
var previousFrame = null;
var previousTimeOfToggle = new Date();

var sp = new SerialPort("COM3", {
  baudrate: 9600
});

sp.on("open", function () {
	console.log("Server started");
	Leap.loop(controllerOptions, function(frame) {
	  if (paused) {
		return; // Skip this update
	  }
	  has_click = false;
	  for( var i = 0; i < frame.fingers.length; i++){
		var pointable = frame.pointables[i];
		if ((pointable.extended == true) && (previousFrame != null) && (previousFrame.pointables[i] != null) && (previousFrame.pointables[i].extended == false)) {
			has_click = true;
			height = pointable.bones[0].center().get(1);
		}
		
		if (pointable.type == 1) {
			if (frame.hands[0].palmPosition[0] < -50) {
				pos = "l";
			} else if (frame.hands[0].palmPosition[0] > 50) {
				pos = "r";
			} else {
				pos = "m";
			}
		}
	  }
	  
	  currentTime = new Date();
	  if ((has_click) && (currentTime - previousTimeOfToggle > 500)) {
		console.log('Toggling Position: ' + pos);
		sp.write(pos);
		previousTimeOfToggle = currentTime;
	  }

	  // Store frame for motion functions
	  previousFrame = frame;
	})
});
