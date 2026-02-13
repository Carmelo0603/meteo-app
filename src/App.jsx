import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Home from "./components/Home";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyNavbar></MyNavbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:city" element={<WeatherDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
