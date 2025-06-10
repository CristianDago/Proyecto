import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const token = Cookies.get("token");
const userId = token ? (jwtDecode<{ uid: string }>(token)).uid : null;

console.log("✅ User ID obtenido del token:", userId);

const socket = io("http://localhost:3000/chat", {
  withCredentials: true,
  query: { userId },
  autoConnect: false, // No conectar automáticamente
});

export default socket;