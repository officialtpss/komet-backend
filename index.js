import 'dotenv/config';
import http from "http";
import express from "express";
import { Server } from "socket.io";

import socket from "./sockets/index.js";

const start = () => {

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const server = http.createServer(app);
    const io = new Server(server, { cors: { origin: "*" } });

    socket(io);

    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

start();
