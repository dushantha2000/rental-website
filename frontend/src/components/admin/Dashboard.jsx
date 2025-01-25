import React, { useState } from 'react';
import Sider from './Sider';
import CustomDashboard from './CustomDashboard';
import Categories from './Categories';
import Users from './Users';
import Notifications from './Notifications';
import ChangePassword from './ChangePassword';
import Layout from '../common/Layout';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <CustomDashboard />;
      case 'categories':
        return <Categories />;
      case 'users':
        return <Users />;
      case 'notifications':
        return <Notifications />;
      case 'password':
        return <ChangePassword />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="bg-gray-900 text-white p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Sider activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
          <div className="col-span-1 md:col-span-3">{renderSection()}</div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
