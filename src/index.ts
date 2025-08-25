import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    roomId: string,
    // socket: WebSocket[]
    socket: WebSocket
}

let allSocket: User[] = [] 

wss.on("connection", (socket) => {
    console.log("user connected!")
    socket.on("message", (msg) => {
        const parsedMsg = JSON.parse(msg as unknown as string)
        if(parsedMsg.type == "join") {
            allSocket.push({
                socket,
                roomId: parsedMsg.payload.roomId
            })
        }
        if(parsedMsg.type == "chat") {
            const currentUserRoom = allSocket.find((x) => x.socket == socket)?.roomId

            for(let i = 0; i < allSocket.length; i++) {
                if (allSocket[i].roomId == currentUserRoom) {
                    allSocket[i].socket.send(parsedMsg.payload.message)
                }
            }
        }
    })
})












 // basic chat app

// import WebSocket, { WebSocketServer } from "ws";

// const wss = new WebSocketServer({ port: 8080 });

// let allSocket = []

// wss.on("connection", (socket) => {
//     console.log("user connected!")
//     allSocket.push(socket)
//     socket.on("message", (message) => {
//         console.log("message   =  " + message.toString())
//         allSocket.forEach((element) => {
//             element.send("Message from server  " + message.toString())
//         })
//     }) 
// })


