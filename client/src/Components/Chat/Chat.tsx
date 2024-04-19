import React from "react";
import styles from "./Chat.module.css";
import { useLocation, useNavigate } from "react-router";
const websocket = new WebSocket("wss://ichat-w9bm.onrender.com/");

const Chat = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    if (message) {
      websocket.send(
        JSON.stringify({
          userName: location.state.userName,
          content: message,
        })
      );
      setMessage("");
    }
    if (message)
      setTimeout(() => {
        mainRef.current?.scrollTo({
          top: mainRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
  };
  const location: {
    state: {
      userName: string;
    };
  } = useLocation();

  const [message, setMessage] = React.useState("");
  const [response, setResponse] = React.useState<
    | []
    | {
        userName: string;
        content: string;
      }[]
  >([]);
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const mainRef = React.useRef<null | HTMLElement>(null);

  const navigate = useNavigate();
  React.useEffect(() => {
    if (location.state) null;
    else navigate("https://chat-run.vercel.app/");
  }, []);

  const processMessage = ({ data }: { data: string }) => {
    setResponse(response.concat(JSON.parse(data)));
  };
  websocket.onmessage = processMessage;
  return (
    <main ref={mainRef} className={styles.chat}>
      <section className={styles.chat__messagers}>
        {response &&
          response.map((message) =>
            message.userName === location.state.userName ? (
              <div
                className={styles.chat__userMessage}
                key={crypto.randomUUID()}
              >
                <p className={styles.chat__userMessage__user}>
                  {message.userName}
                </p>
                <p className={styles.chat__userMessage__content}>
                  {message.content}
                </p>
              </div>
            ) : (
              <div
                className={styles.chat__otherMessage}
                key={crypto.randomUUID()}
              >
                <p className={styles.chat__otherMessage__user}>
                  {message.userName}
                </p>
                <p className={styles.chat__otherMessage__content}>
                  {message.content}
                </p>
              </div>
            )
          )}
      </section>
      <form onSubmit={handleSubmit} className={styles.chat__message_bar}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Mensagem..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button></button>
      </form>
    </main>
  );
};
export default Chat;
