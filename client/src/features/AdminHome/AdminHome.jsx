import React, { Component, useEffect } from 'react';
// import { useHistory } from '../../hooks/useHistory';
import { Link } from 'react-router-dom';

// const history = useHistory();

// const handleOnClick = (path) => {
//   history.push(path);
// };

const AdminHome = () => {
  return (
    <div>
      <Link to={'./../my/table'}>
        {/* Using the global state variable from App.js */}
        <button>go to</button>
      </Link>
    </div>
  );
};

export default AdminHome;
