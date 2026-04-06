import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="container-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<PrivateRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
