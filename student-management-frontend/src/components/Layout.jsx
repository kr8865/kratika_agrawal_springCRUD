import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden font-sans">
      <Navbar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto"> 
          <Outlet />
        </div>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
