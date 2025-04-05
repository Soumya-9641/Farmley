
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Footer from './pages/Footer'
import Home from './pages/Home'
import Products from './pages/Product'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import CategoryProducts from "./pages/CategoryProducts"
import ProductDetail from './pages/ProductDetail'
import AuthForm from './pages/AuthForm'

function App() {
//  const [count, setCount] = useState(0)

  return (
    <>
      
     
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/products/:category" element={<CategoryProducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
