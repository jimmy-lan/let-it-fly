import React, { Component, useEffect } from 'react';
// import { useHistory } from '../../hooks/useHistory';
import { Link } from '../../common';
import Button from '@material-ui/core/Button';
import './style.css';

// const history = useHistory();

// const handleOnClick = (path) => {
//   history.push(path);
// };

const AdminHome = () => {
  return (
    <div>
      <Link to={'./../my/cranesTable'}>
        <Button className="button" variant="contained">
          cranes
        </Button>
      </Link>
      <Link to={'./../my/usersTable'}>
        <Button className="button" variant="contained">
          users
        </Button>
      </Link>
      <Link to={'./../my/logTable'}>
        <Button className="button" variant="contained">
          activity log
        </Button>
      </Link>
      <Link to={'./../my/storeTable'}>
        <Button className="button" variant="contained">
          store
        </Button>
      </Link>
    </div>
  );
};

export default AdminHome;
