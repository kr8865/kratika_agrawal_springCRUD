import { Bell, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-20 glass flex items-center justify-between px-8 border-b border-slate-200 sticky top-0 z-10">
      <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-64 md:w-96 border border-slate-200">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Global search..." 
          className="bg-transparent border-none outline-none ml-2 w-full text-sm placeholder-slate-400"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-slate-100 transition-colors relative text-slate-500">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-500 to-teal-400 p-0.5">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="Profile" 
            className="rounded-full bg-white w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
