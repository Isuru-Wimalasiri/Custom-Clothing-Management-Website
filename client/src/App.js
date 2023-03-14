import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/footer';
import Home from './pages/Home/home';
import Signup from './pages/SignUp/signup';
import Product from './pages/Product/product';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/owndesign" />
          <Route path="/products" />
          <Route path="/contact" />
          <Route path="/search" />
          <Route path="/favorite" />
          <Route path="/profile" />
          <Route path="/login" />

          <Route path="/product" element={<Product />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
