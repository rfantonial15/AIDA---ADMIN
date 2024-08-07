import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../assets/aida-logo.png';
import DashboardLogo from '../assets/navbar/dashboard-line.svg';
import DashboardLogoGreen from '../assets/navbar/dashboard-line-green.svg';
import ReportLogo from '../assets/navbar/report-line.svg';
import ReportLogoGreen from '../assets/navbar/report-line-green.svg';
import UserLogo from '../assets/navbar/user-line.svg';
import UserLogoGreen from '../assets/navbar/user-line-green.svg';
import AlertLogo from '../assets/navbar/alert-line.svg';
import AlertLogoGreen from '../assets/navbar/alert-line-green.svg';
import SettingLogo from '../assets/navbar/setting-line.svg';
import SettingLogoGreen from '../assets/navbar/setting-line-green.svg';
import LogoutLogo from '../assets/navbar/log-out-line.svg';

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
    <div className="flex min-h-screen bg-bglightgray">
      <aside className="w-80 flex bg-white flex-col">
        <div className="pt-10 pl-[120px]">
          <img src={Logo} alt="AIDA Logo" className="w-20" />
        </div>
        <nav className="flex-grow pt-10 px-8">
          <ul>
            <li className="pt-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "flex items-center rounded-lg p-4 bg-lightgreen text-white" : "flex items-center p-4 rounded-lg bg-white hover:bg-lightgreen"
                }
              >
                <img src={isActive('/dashboard') ? DashboardLogoGreen : DashboardLogo} alt="Dashboard Logo" className="mr-5" />
                <span className={isActive('/dashboard') ? 'text-green' : 'text-gray'}>Dashboard</span>
              </NavLink>
            </li>
            <li className="pt-2">
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  isActive ? "flex items-center rounded-lg p-4 bg-lightgreen text-white" : "flex items-center p-4 rounded-lg bg-white hover:bg-lightgreen"
                }
              >
                <img src={isActive('/reports') ? ReportLogoGreen : ReportLogo} alt="Reports Logo" className="mr-5" />
                <span className={isActive('/reports') ? 'text-green' : 'text-gray'}>Reports</span>
              </NavLink>
            </li>
            <li className="pt-2">
              <NavLink
                to="/usermanagement"
                className={({ isActive }) =>
                  isActive ? "flex items-center rounded-lg p-4 bg-lightgreen text-white" : "flex items-center p-4 rounded-lg bg-white hover:bg-lightgreen"
                }
              >
                <img src={isActive('/usermanagement') ? UserLogoGreen : UserLogo} alt="User Management Logo" className="mr-5" />
                <span className={isActive('/usermanagement') ? 'text-green' : 'text-gray'}>User Management</span>
              </NavLink>
            </li>
            <li className="pt-2">
              <NavLink
                to="/sendalert"
                className={({ isActive }) =>
                  isActive ? "flex items-center rounded-lg p-4 bg-lightgreen text-white" : "flex items-center p-4 rounded-lg bg-white hover:bg-lightgreen"
                }
              >
                <img src={isActive('/sendalert') ? AlertLogoGreen : AlertLogo} alt="Send Alert Logo" className="mr-5" />
                <span className={isActive('/sendalert') ? 'text-green' : 'text-gray'}>Send Alert</span>
              </NavLink>
            </li>
            <li className="pt-2">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? "flex items-center rounded-lg p-4 bg-lightgreen text-white" : "flex items-center p-4 rounded-lg bg-white hover:bg-lightgreen"
                }
              >
                <img src={isActive('/settings') ? SettingLogoGreen : SettingLogo} alt="Settings Logo" className="mr-5" />
                <span className={isActive('/settings') ? 'text-green' : 'text-gray'}>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="p-4 px-8 pb-14">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "flex items-center p-4 bg-red" : "flex items-center p-4 rounded-lg bg-red hover:bg-red"
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
            <p className="text-green">City Government of El Salvador - City Disaster Risk Reduction Management Office</p>
            <p className="text-green font-medium">{formatDate(dateTime)}</p>
          </div>
        </header>
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Navbar;
