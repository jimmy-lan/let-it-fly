import React, { Component, useEffect } from 'react';
import { useHistory } from '../../hooks/useHistory';

const history = useHistory();

const handleOnClick = (path) => {
  history.push(path);
};

const AdminHome = () => {
  return (
    <div>
      <button onClick={handleOnClick('/table')}> Go to table</button>
    </div>
  );
};

export default AdminHome;
