import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const getSocket = (): Socket => {
    if (!socket) {
        socket = io('http://99.252.98.97');
    }

    return socket;
}