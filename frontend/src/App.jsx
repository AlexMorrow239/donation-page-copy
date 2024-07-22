import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "swiper/css";
import "swiper/css/pagination";
import "@fortawesome/fontawesome-free/css/all.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import DonatePage from "./pages/Donate";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/donate/1" />} />
        <Route path="/donate" element={<Navigate to="/donate/1" />} />
        <Route path="/donate/:step" element={<DonatePage />} />
      </Routes>
    </Router>
  );
}
