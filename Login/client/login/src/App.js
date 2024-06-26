import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import LoginContextProvider from './contexts/LoginContextProvider';
import About from './pages/About';
import User from './pages/User';
import Join from './pages/Join';
import Login from './pages/Login';
import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/lgoin" element={<Login />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
