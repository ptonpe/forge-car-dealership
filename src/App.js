import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react"
import Landing from './Landing';
import Gallery from './Gallery';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes> 
        <Route path="/" element={<Landing />} />
        <Route path="/car-gallery" element={<Gallery />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
