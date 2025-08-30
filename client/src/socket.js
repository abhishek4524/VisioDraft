import { io } from "socket.io-client";

let socket = null;

export const initSocket = (serverUrl, token) => {
  if (socket) return socket;
  socket = io(serverUrl, {
    autoConnect: true,
    auth: { token } // or use query: { token }
  });
  return socket;
};

export const getSocket = () => socket;
