import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const getSocket = (): Socket => {
    if (!socket) {
        socket = io('http://99.253.1.168', {
            autoConnect: false
        });
    }

    return socket;
}