import { NavLink } from 'react-router-dom';
import { Home, Users } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Students', path: '/students', icon: Users },
  ];

  return (
    <aside className="w-64 glass h-full hidden md:flex flex-col border-r border-slate-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">StudentMS</h2>
        <p className="mt-1 text-sm text-slate-500">Student records, reimagined.</p>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
