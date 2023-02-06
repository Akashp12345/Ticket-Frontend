import Lgnav from "./Component/Nav";

import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Checkout from "./Component/Checkout";
import Model1 from "./Component/Modal1";
import Home from "./Component/Home";
import Model2 from "./Component/Model2";
import SignIn from "./Component/Login";
import Mybooking from "./Component/Mybooking";
function App() {
  const data = useSelector(state => state.movies)
  const { user } = data
  return (
    <div className="App">
      <BrowserRouter>
        <Lgnav/>
        <Home/>
        <Routes>
           <Route path="/Login/:name" element={<SignIn/>} />
          <Route path="/detail/:name" element={<Model1/>} />
          <Route path="/seats/:name" element={<Model2/>}/>
          <Route path="/Checkout/:name" element={<Checkout/>}/>
          <Route path="/mybooking" element={<Mybooking/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
