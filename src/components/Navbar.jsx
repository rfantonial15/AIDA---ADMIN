import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../assets/AIDA-Logo.png';
import DashboardLogo from '../assets/navbar/dashboard-line.png';
import DashboardLogoGreen from '../assets/navbar/dashboard-line-green.png';
import ReportLogo from '../assets/navbar/report-line.png';
import ReportLogoGreen from '../assets/navbar/report-line-green.png';
import UserLogo from '../assets/navbar/user-line.png';
import UserLogoGreen from '../assets/navbar/user-line-green.png';
import AlertLogo from '../assets/navbar/alert-line.png';
import AlertLogoGreen from '../assets/navbar/alert-line-green.png';
import SettingLogo from '../assets/navbar/setting-line.png';
import SettingLogoGreen from '../assets/navbar/setting-line-green.png';
import LogoutLogo from '../assets/navbar/logout-line.png';
import '@fontsource/inter'; // Import Inter font

const Navbar = ({ children }) => {
  const [dateTime, setDateTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateStr = date.toLocaleDateString(undefined, dateOptions);
    const timeStr = date.toLocaleTimeString(undefined, timeOptions);
    return `${dateStr} - ${timeStr}`;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-80 flex bg-white flex-col">
        <div className="pt-10 pl-32">
          <img src={Logo} alt="AIDA Logo" className="w-16" />
        </div>
        <nav className="flex-grow pt-10 px-8">
          <ul>
            <NavItem
              to="/dashboard"
              isActive={location.pathname === '/dashboard'}
              icon={DashboardLogo}
              activeIcon={DashboardLogoGreen}
              label="Dashboard"
            />
            <NavItem
              to="/reports"
              isActive={location.pathname === '/reports'}
              icon={ReportLogo}
              activeIcon={ReportLogoGreen}
              label="Reports"
            />
            <NavItem
              to="/usermanagement"
              isActive={location.pathname === '/usermanagement'}
              icon={UserLogo}
              activeIcon={UserLogoGreen}
              label="User Management"
            />
            <NavItem
              to="/sendalert"
              isActive={location.pathname === '/sendalert'}
              icon={AlertLogo}
              activeIcon={AlertLogoGreen}
              label="Send Alert"
            />
            <NavItem
              to="/settings"
              isActive={location.pathname === '/settings'}
              icon={SettingLogo}
              activeIcon={SettingLogoGreen}
              label="Settings"
            />
          </ul>
        </nav>
        <div className="p-4 px-8 pb-14">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "flex items-center p-4 bg-red-200" : "flex items-center p-4 rounded-lg bg-red-500 hover:bg-red-600"
            }
          >
            <img src={LogoutLogo} alt="Logout Logo" className="mr-5" />
            <span className="text-white">Logout</span>
          </NavLink>
        </div>
      </aside>
      <main className="flex-grow">
        <header>
          <div className="flex justify-between items-center bg-white py-4 pl-8 pr-8">
            <p className="text-green-700">City Government of El Salvador - City Disaster Risk Reduction Management Office</p>
            <p className="text-green-700 font-medium">{formatDate(dateTime)}</p>
          </div>
        </header>
        <div>{children}</div>
      </main>
    </div>
  );
};

const NavItem = ({ to, isActive, icon, activeIcon, label }) => (
  <li className="pt-2">
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "flex items-center rounded-lg p-4 bg-green-200 text-white" : "flex items-center p-4 rounded-lg bg-white hover:bg-green-200"
      }
    >
      <img src={isActive ? activeIcon : icon} alt={`${label} Logo`} className="mr-5" />
      <span className={isActive ? 'text-green-700' : 'text-gray-500'}>{label}</span>
    </NavLink>
  </li>
);

export default Navbar;
