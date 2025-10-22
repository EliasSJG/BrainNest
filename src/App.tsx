import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Page from "./pages/page";
import FolderPage from "./pages/folderPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/:id" element={<Page />} />
        <Route path="/folder/:id" element={<FolderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
