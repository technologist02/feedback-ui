import { Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { SimpleTestReport } from "./Pages/SimpleTestReport";
import { NotFound } from "./Pages/NotFound";
import { About } from "./Pages/About";
import { Header } from "./Components/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
            {/* <Route path="/" element={<SimpleTestReport/>} /> */}
            <Route path="/simpleTestReport/:id" element={<SimpleTestReport />} />
            <Route path="/about" element={<About/>} />
            <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
