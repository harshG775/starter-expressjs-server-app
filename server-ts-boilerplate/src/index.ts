import http from "http";

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    res.end("Hello World!");
});

server.listen(8000, () => {
    console.log("Server is running on port http://localhost:8000");
});
