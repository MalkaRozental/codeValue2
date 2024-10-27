import { Box, Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { Header } from "./components/header/Header";
import { Products } from "./components/Products";

function App() {
  return (
    <Container fixed>
      <Box sx={{ height: "100vh" }}>
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </Router>
      </Box>
    </Container>
  );
}

export default App;
