const io = require("socket.io");
const server = io(8000);
let sequenceNumberByClient = new Map();


server.on("connection", (socket) => {
    console.log("connection de client \n");
    sequenceNumberByClient.set(socket, 1);
    console.info(`Client connected : [id=${socket.id}]`);
    console.log('fati');
    // initialize this client's sequence number
    
    socket.emit("hello", "world");
    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        sequenceNumberByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
  });

});


setInterval(() => {
    for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
        client.emit("seq-num", sequenceNumber);
        sequenceNumberByClient.set(client, sequenceNumber + 1);
    }
}, 1000);


