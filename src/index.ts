import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
    //  6: 00    
    console.log("user connected!");
    socket.send("chat started!")
    socket.on("message", (data) => {
        console.log(data.toString());
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        })
    })
    socket.on("close", () => {
        console.log("user disconnected!")
    })
})  