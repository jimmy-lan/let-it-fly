import React, { Component, useEffect } from "react";
// import { useHistory } from '../../hooks/useHistory';
import { Link } from "../../common";
import Button from "@material-ui/core/Button";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
// const history = useHistory();

// const handleOnClick = (path) => {
//   history.push(path);
// };
const useStyles = makeStyles({
  root: {
    background: (props) =>
      props.color === "red"
        ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: (props) =>
      props.color === "red"
        ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
        : "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    margin: 8,
  },
});

function MyButton(props) {
  const { color, ...other } = props;
  const classes = useStyles(props);
  return <Button className={classes.root} {...other} />;
}

MyButton.propTypes = {
  color: PropTypes.oneOf(["blue", "red", "green"]).isRequired,
};

const AdminHome = () => {
  const classes = useStyles();
  return (
    <div>
      <Link to={"./../my/cranesTable"}>
        <MyButton color="red" variant="contained">
          cranes
        </MyButton>
      </Link>
      <Link to={"./../my/usersTable"}>
        <MyButton color="blue" variant="contained">
          users
        </MyButton>
      </Link>
      <Link to={"./../my/logTable"}>
        <MyButton color="red" variant="contained">
          activity log
        </MyButton>
      </Link>
      <Link to={"./../my/storeTable"}>
        <MyButton color="green" variant="contained">
          store
        </MyButton>
      </Link>
    </div>
  );
};

export default AdminHome;
