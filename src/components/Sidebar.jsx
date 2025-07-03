import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiBook, FiMic, FiCalendar, FiActivity, FiFileText, FiUsers } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
    { name: 'AI Assistant', icon: FiBook, path: '/assistant' },
    { name: 'Lesson Plans', icon: FiCalendar, path: '/lessons' },
    { name: 'Worksheets', icon: FiFileText, path: '/worksheets' },
    { name: 'Speech Analysis', icon: FiMic, path: '/speech' },
    { name: 'Students', icon: FiUsers, path: '/students' },
    { name: 'Activities', icon: FiActivity, path: '/activities' },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname.startsWith(item.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${
                    location.pathname.startsWith(item.path)
                      ? 'text-blue-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <FiUser className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Teacher</p>
              <p className="text-xs font-medium text-gray-500">View profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;