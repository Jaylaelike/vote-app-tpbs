import { io } from 'socket.io-client';

export const socket_2 = io(
    import.meta.env.VITE_SOCKET_URL_CREATIVE as string,
);