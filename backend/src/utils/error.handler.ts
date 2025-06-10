import { Socket } from "socket.io";

export const handleError = (socket: Socket, event: string, error: Error) => {
  socket.emit("error", {
    event,
    message: "An error occurred",
  });
};
