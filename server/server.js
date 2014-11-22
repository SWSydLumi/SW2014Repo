var serialPort = require("serialport");
var SerialPort = serialPort.SerialPort; // localize object constructor

var sp = new SerialPort("COM3", {
  baudrate: 9600
});

sp.on("open", function () {
	setInterval(function(){
	  sp.write("a\n");
	}, 1 * 1000);
	
	setInterval(function(){
	  sp.write("d\n");
	}, 1 * 1000);
});
