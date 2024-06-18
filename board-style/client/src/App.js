import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import List from './Pages/borad/List';
import { Insert } from './Pages/borad/Insert';
import Read from './Pages/borad/Read';
import Update from './Pages/borad/Update';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/boards" element={<List/>}></Route>
        <Route path="/boards/insert" element={<Insert/>}></Route>
        <Route path="/boards/:no" element={<Read/>}></Route>
        <Route path="/boards/update/:no" element={<Update/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
