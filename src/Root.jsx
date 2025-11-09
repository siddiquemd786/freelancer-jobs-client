// src/Root.jsx
import React from 'react';
import { Outlet } from 'react-router';
import Footer from './component/Footer';
import Navbar from './component/Navbar';

const Root = () => {
    return (
       <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
    );
};

export default Root;