import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login/Login";
import Chat from "./Chat/Chat";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
