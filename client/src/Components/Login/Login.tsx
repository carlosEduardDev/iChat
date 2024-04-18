import React from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [name, setName] = React.useState("");
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/chat", {
      state: {
        userName: name,
      },
    });
  };
  return (
    <main className={styles.login}>
      <h1>Login</h1>
      <form onSubmit={(e) => e.preventDefault()} className={styles.login__form}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Insira seu nome..."
        />
        {!name && <input type="submit" disabled value="Entrar" />}
        {name && (
          <input type="submit" value="Entrar" onClick={handleNavigate} />
        )}
      </form>
    </main>
  );
};
export default Login;
