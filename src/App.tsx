import React from 'react';
import Routers from './routes/routes';

export const apiUrl = "http://178.128.107.238:8000/apiv1/control";
export const apiPost = "http://178.128.107.238:8000/apiv1/control";
export const apiDelete = "http://178.128.107.238:8000/apiv1/control/";
export const tenantUrl = "http://178.128.107.238:8000/apiv1/reader";
export const tenantPost = "http://178.128.107.238:8000/apiv1/reader/"
export const tenantDelete = "http://178.128.107.238:8000/apiv1/reader/";

const App: React.FC = () => {
  return (
    <div className='main-container'>
      <Routers />
    </div>
  );
};

export default App;
