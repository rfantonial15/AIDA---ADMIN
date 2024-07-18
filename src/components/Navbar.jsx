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

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-80 flex bg-white flex-col">
        <div className="pt-10 pl-32">
          <img src={Logo} alt="AIDA Logo" className="w-16" />
        </div>
        <nav className="flex-grow pt-10 px-8">
          <ul>
            <li className="pt-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "flex items-center rounded-lg p-4 bg-green-200 text-white" : "flex items-center p-4 rounded-lg bg-white hover:bg-green-200"
                }
              >
                <img src={isActive('/dashboard') ? DashboardLogoGreen : DashboardLogo} alt="Dashboard Logo" className="mr-5" />
                <span className={isActive('/dashboard') ? 'text-green-700' : 'text-gray-500'}>Dashboard</span>
              </NavLink>
            </li>
            <li className="pt-2">
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  isActive ? "flex items-center rounded-lg p-4 bg-green-200 text-white" : "flex items-center p-4 rounded-lg bg-white hover:bg-green-200"
                }
              >
                <img src={isActive('/reports') ? ReportLogoGreen : ReportLogo} alt="Reports Logo" className="mr-5" />
                <span className={isActive('/reports') ? 'text-green-700' : 'text-gray-500'}>Reports</span>
              </NavLink>
            </li>
            <li className="pt-2">
              <NavLink
                to="/usermanagement"
                className={({ isActive }) =>
                  isActive ? "flex items-center rounded-lg p-4 bg-green-200 text-white" : "flex items-center p-4 rounded-lg bg-white hover:bg-green-200"
                }
              >
                <img src={isActive('/usermanagement') ? UserLogoGreen : UserLogo} alt="User Management Logo" className="mr-5" />
                <span className={isActive('/usermanagement') ? 'text-green-700' : 'text-gray-500'}>User Management</span>
              </NavLink>
            </li>
            <li className="pt-2">
              <NavLink
                to="/sendalert"
                className={({ isActive }) =>
                  isActive ? "flex items-center rounded-lg p-4 bg-green-200 text-white" : "flex items-center p-4 rounded-lg bg-white hover:bg-green-200"
                }
              >
                <img src={isActive('/sendalert') ? AlertLogoGreen : AlertLogo} alt="Send Alert Logo" className="mr-5" />
                <span className={isActive('/sendalert') ? 'text-green-700' : 'text-gray-500'}>Send Alert</span>
              </NavLink>
            </li>
            <li className="pt-2">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? "flex items-center rounded-lg p-4 bg-green-200 text-white" : "flex items-center p-4 rounded-lg bg-white hover:bg-green-200"
                }
              >
                <img src={isActive('/settings') ? SettingLogoGreen : SettingLogo} alt="Settings Logo" className="mr-5" />
                <span className={isActive('/settings') ? 'text-green-700' : 'text-gray-500'}>Settings</span>
              </NavLink>
            </li>
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

export default Navbar;
