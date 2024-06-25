
import { getTrade } from "../controller/trade.controller.js";

const start = (io) => {

    io.on('connection', (socket) => {

        console.log('Connected');

        socket.on('disconnect', () => {
            console.log('Disconnected');
        });

        socket.on("get-trade", async () => {
            const { status, data = {}, message } = await getTrade();
            if (status === 200) {
                io.emit('get-trade', data);
            } else {
                io.emit('get-trade', message);
            }
        });
    });
};

export default start;