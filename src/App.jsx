import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PlaceOrder from './pages/PlaceOrder';
import { AuthProvider } from './context/AuthContext';
import ShopContextProvider from './context/ShopContext';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
      <ShopContextProvider>
        <AuthProvider>
          <div className='px-4 sm:px[5vw] md:px[7vw] lg:px[10vw] xl:px[15vw]'>
            <ToastContainer />
            <Navbar />
            <SearchBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/collection' element={<Collection />} />
              <Route path="/collection/:filter" element={<Collection />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='product/:productId' element={<Product />} />
              <Route path='cart' element={<Cart />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/place-order' element={<PlaceOrder />} />
            </Routes>
            <Footer />
          </div>
        </AuthProvider>
      </ShopContextProvider>
  );
}

export default App;