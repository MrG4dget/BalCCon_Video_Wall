// Websocket and Serial Port is required, (npm install ws) (npm install serialport)
const { WebSocketServer } = require("ws");
const { SerialPort } = require("serialport");

// Listen on Port 8888 for Websocket connection
const wss = new WebSocketServer({ port: 8888 });

// Define the Serial Port of the Teensy (change the path to yours)
const port = new SerialPort(
  {
    path: "/dev/cu.usbmodem42687201",
    baudRate: 9600,
    databits: 8,
    parity: "none",
  },
  false
);

//Wait for connection
wss.on('connection', function connection(ws) {
  //When message is recieved send it over serial
  ws.on('message', function message(data) {
    port.write(data, function (err) {
        if (err) {
          return console.log("Error on write: ", err.message);
        }
      });
    });
});
