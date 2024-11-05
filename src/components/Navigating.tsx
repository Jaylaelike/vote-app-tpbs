import { NavLink , useLocation} from "react-router-dom";
import { Vote, BarChart2, Info, ListChecks } from "lucide-react";

const Navigation = () => {

    const location = useLocation();

  const navItems = [
    { to: "/", icon: Vote, label: "โหวตโครงการยอดนิยม" },
    { to: '/vote2', icon: ListChecks, label: 'โหวตโครงการสร้างสรรค์' },
    { to: "/results", icon: BarChart2, label: "ผลโหวต" },
    { to: "/about", icon: Info, label: "เกี่ยวกับ" },
  ];


  const handleNavClick = (path: string) => {
    if (location.pathname !== path) {
      window.location.href = path;
    }
  };


  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-center">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => handleNavClick(to)}
              className={({ isActive }) =>
                `flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200
                ${
                  isActive
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300"
                }`
              }
            >
              <Icon className="w-5 h-5 mr-2" />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
