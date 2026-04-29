import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ContactModal from './ContactModal';

const Navbar = () => {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <header className="h-16 glass flex items-center justify-between px-6 md:px-8 border-b border-slate-200 sticky top-0 z-20">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-teal-400 flex items-center justify-center shadow-md shadow-primary-500/20">
            <BookOpen size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">edutrack</h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors" title="Coming soon">
            Log in
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary-500 text-sm font-medium text-white hover:bg-primary-600 transition-colors">
            Sign up
          </button>
          <button 
            onClick={() => setIsContactOpen(true)}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Contact
          </button>
        </div>
      </header>
      
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default Navbar;
