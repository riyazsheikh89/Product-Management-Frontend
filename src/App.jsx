import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ProductList from './components/product/ProductList';
import EditProduct from './components/product/EditProduct';

function App() {

  return (
    <div className="max-w-screen max-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<EditProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
