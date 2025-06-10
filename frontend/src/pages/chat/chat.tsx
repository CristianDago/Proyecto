import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { useAuth } from "../../components/auth/authContext";
import socket from "../../socket";
import { Grid } from "../../components/common/grid/grid";
import css from "./chat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

interface Message {
  userId: string;
  email?: string;
  msg: string;
  id?: number;
}

const Chat: React.FC = memo(() => {
  const { userId, email } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("Quinta Normal");
  const [availableRooms, setAvailableRooms] = useState<string[]>([
    "Quinta Normal",
    "Buín",
    "La Granja",
    "Ñuñoa",
    "Pudahuel",
    "San Miguel",
  ]);

  const isConnected = useRef(false);
  const hasJoinedRoom = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Referencia al final de los mensajes

  const handleMessage = useCallback(({ userId, email, msg }: Message) => {
    setMessages((prev) => [
      ...prev,
      { userId, email: email || "Usuario desconocido", msg, id: Date.now() },
    ]);
  }, []);

  const handleUserDisconnected = useCallback(
    ({ userId, email }: { userId: string; email: string | null }) => {
      let displayEmail = email;

      // Si el email no viene en el evento, buscarlo en los mensajes anteriores
      if (!displayEmail) {
        const previousMessage = messages.find((msg) => msg.userId === userId);
        displayEmail = previousMessage?.email || "Desconocido";
      }

      console.log(`Usuario ${displayEmail} se ha desconectado`);

      setMessages((prev) => [
        ...prev,
        {
          userId: "System",
          email: "Sistema",
          msg: `El usuario ${displayEmail} se ha desconectado`,
          id: Date.now(),
        },
      ]);
    },
    [messages]
  );

  useEffect(() => {
    console.log("✅ Componente montado");

    if (userId && !isConnected.current) {
      console.log(" Conectando al socket con userId:", userId);
      socket.connect();

      if (!hasJoinedRoom.current) {
        socket.emit("join", room);
        hasJoinedRoom.current = true;
      }

      isConnected.current = true;

      socket.on("message", handleMessage);
      socket.on("userDisconnected", handleUserDisconnected);

      return () => {
        console.log("❌ Limpiando eventos y desconectando socket...");
        socket.off("message", handleMessage);
        socket.off("userDisconnected", handleUserDisconnected);
        socket.disconnect();
        isConnected.current = false;
        hasJoinedRoom.current = false;
      };
    }

    return () => {
      console.log("❌ Componente desmontado");
    };
  }, [userId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", { userId, email, msg: message, room });
      setMessage("");
    }
  };

  const joinRoom = (newRoom: string) => {
    if (newRoom !== room) {
      socket.emit("join", newRoom);
      setRoom(newRoom);
      setMessages([]);
      hasJoinedRoom.current = true;
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div>
        <h1>Chat</h1>
      </div>

      <Grid className={`${"grid-columns-2"} ${css.chat}`}>
        <div className={css.leftChat}>
          <div>
            <div className={css.title}>
              <strong>Salas disponibles:</strong>
            </div>
            {availableRooms.map((availableRoom) => (
              <button
                className={css.botonChat}
                key={availableRoom}
                onClick={() => joinRoom(availableRoom)}
              >
                <FontAwesomeIcon icon={faComments} className={css.icons} />{" "}
                {availableRoom}
              </button>
            ))}
          </div>
        </div>

        <div className={css.rightChat}>
          <div className={css.titleChat}>
            <strong>Sala actual:</strong> {room}
          </div>
          <div className={css.chatMessages}>
            {messages.map(
              ({ userId: senderId, email: senderEmail, msg, id }) => {
                let displayName = senderEmail || "Usuario desconocido";

                if (senderId === "System") {
                  displayName = "Sistema";
                } else if (senderId === userId) {
                  displayName = "Tú";
                }

                return (
                  <div key={id}>
                    <strong>{displayName}:</strong> {msg}
                  </div>
                );
              }
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={css.inputContainer}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </div>
      </Grid>
    </>
  );
});

export default Chat;
