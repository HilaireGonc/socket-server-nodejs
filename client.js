const io = require("socket.io-client"),
ioClient = io.connect("http://localhost:8000");

ioClient.on("hello", (arg) => {
    console.log(arg); // world
    ioClient.on("seq-num", (msg) => console.log(msg));
  });
