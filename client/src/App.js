import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Login from './components/Login';
import SignUp from './components/Signup';

const App = () => {
  const location = useLocation();

  // Check if the current location is either '/login' or '/signup'
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className='w-full mx-auto bg-slate-100'>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/property/:id' element={<PropertyDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default App;
