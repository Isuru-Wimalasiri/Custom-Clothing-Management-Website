import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/footer';
import Home from './pages/Home/home';
import Signup from './pages/SignUp/signup';
import Product from './pages/Product/product';
import Login from './pages/Login/login';
import ProductList from './pages/ProductList/productList';
import Cart from './pages/Cart/cart';
import AdminRoute from './components/adminRoute/adminRoute';
import AdminDashboard from './pages/AdminDashboard/adminDashboard';
import UserList from './pages/UserList/UserList';
import User from './pages/User/User';
import NewUser from './pages/NewUser/NewUser';
import NewProduct from './pages/NewProduct/NewProduct';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import TopAndSide from './components/topAndSide/topAndSide';

function App() {
  return (
    <div className="App">
      <Router>
        <TopAndSide />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/owndesign" />
          <Route path="/products" />
          <Route path="/contact" />
          <Route path="/search" />
          <Route path="/favorite" />
          <Route path="/profile" />
          <Route path="/login" element={<Login />} />

          <Route path="/product/:id" element={<Product />} />
          <Route path="/productList/:id" element={<ProductList />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboard />}>
              <Route path="users" element={<UserList />} />

              <Route path="user/:userId" element={<User />} />
              <Route path="newUser" element={<NewUser />} />

              <Route path="products" element={<ProductList />} />
              <Route path="product/:productId" element={<Product />} />
              <Route path="newproduct" element={<NewProduct />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
