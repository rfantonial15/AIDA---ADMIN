import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../assets/AIDA-Logo.png';
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-80 flex bg-white flex-col">
        <div className="pt-10 pl-32">
          <img src={Logo} alt="AIDA Logo" className="w-16" />
        </div>
        <nav className="flex-grow pt-10 px-8 font-size-md">
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
            <p className="text-green font-size-sm">City Government of El Salvador - City Disaster Risk Reduction Management Office</p>
            <p className="text-green font-inter-bold font-size-sm">{formatDate(dateTime)}</p>
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
        isActive ? "flex items-center rounded-lg p-4 bg-lightgreen text-white" : "flex items-center p-4 rounded-lg bg-white hover:bg-lightgreen"
      }
    >
      <img src={isActive ? activeIcon : icon} alt={`${label} Logo`} className="mr-5" />
      <span className={isActive ? 'text-green' : 'text-gray'}>{label}</span>
    </NavLink>
  </li>
);

export default Navbar;