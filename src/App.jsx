import reactLogo from "./assets/react.svg";
import MainNavbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Items from "./pages/Items";
import NewList from "./pages/NewList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="items" element={<Items />} />
        <Route path="newlist" element={<NewList />} />
      </Routes>
    </Router>
  );
}

export default App;
