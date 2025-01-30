import React, { useState } from 'react';
import Slider from './Slider';
import CustomDashboard from './CustomDashboard';
import Notifications from './Notifications';
import ChangePassword from './ChangePassword';
import Layout from '../common/Layout';
import Edit from './Edit';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <CustomDashboard />;
      case 'new':
        return <Property/>;
      case 'edit':
        return <Edit />;
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
            <Slider activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
          <div className="col-span-1 md:col-span-3">{renderSection()}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
