import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import Device from '../components/device/device';
import Tenant from '../components/tenant/tenant';

const Routers: React.FC = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Device />} />
          <Route path="/tenant" element={<Tenant />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;
 