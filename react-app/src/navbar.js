import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Navbar } from "reactstrap";
import { Link } from "react-router-dom";
import BarChartIcon from "@material-ui/icons/BarChart";
import ListIcon from "@material-ui/icons/List";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const NavBar = (props) => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;
  const mode = props.mode;
  const handleModeChange = props.handleModeChange;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {hasUser ? (
        <>
          <>
            <Link to="/" style={{ textDecoration: "none" }}>
              {mode === false ? (
                <span className="nav-header" onClick={handleModeChange}>
                  Event Transpo Tracker
                </span>
              ) : (
                <span className="nav-header" onClick={handleModeChange}>
                  Event Transpo Manager
                </span>
              )}
            </Link>
            <Navbar align="right">
              {mode === false ? (
                <>
                  <span className="nav-icon">
                    <Link to="/log">
                      <ListIcon
                        style={{ fontSize: 30 }}
                        color="action"
                        className="navbar-icon"
                      />
                    </Link>
                  </span>
                  <span className="nav-icon">
                    <Link to="/graph">
                      <BarChartIcon
                        style={{ fontSize: 30 }}
                        color="action"
                        className="navbar-icon"
                      />
                    </Link>
                  </span>
                  <span className="nav-icon">
                    <Link to="/entry/form">
                      <PlaylistAddIcon
                        style={{ fontSize: 30 }}
                        color="action"
                        className="navbar-icon"
                      />
                    </Link>
                  </span>
                  <span className="nav-icon">
                    <Link to="/login" onClick={clearUser}>
                      <ExitToAppIcon
                        style={{ fontSize: 30 }}
                        color="action"
                        className="navbar-icon"
                      />
                    </Link>
                  </span>
                </>
              ) : (
                <>
                <span className="nav-icon">
                    <Link to="/driver/list">
                      <ListIcon
                        style={{ fontSize: 30 }}
                        color="action"
                        className="navbar-icon"
                      />
                    </Link>
                  </span>
                  <span className="nav-icon">
                    <Link to="/route/view">
                      <ViewColumnIcon
                        style={{ fontSize: 30 }}
                        color="action"
                        className="navbar-icon"
                      />
                    </Link>
                  </span>
                  <span className="nav-icon">
                    <Link to="/driver/form">
                      <PersonAddIcon
                        style={{ fontSize: 30 }}
                        color="action"
                        className="navbar-icon"
                      />
                    </Link>
                  </span>
                  <span className="nav-icon">
                    <ArrowDownwardIcon
                      style={{ fontSize: 30 }}
                      color="action"
                      aria-haspopup="true"
                      aria-controls="lock-menu"
                      onClick={handleClickListItem}
                    />
                    <Menu
                      id="lock-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <div onClick={handleClose}>
                        <MenuItem>
                          <Link
                            to="/date/form"
                            style={{ textDecoration: "none" }}
                          >
                            Add Date
                          </Link>
                        </MenuItem>
                      </div>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="/route/form"
                          style={{ textDecoration: "none" }}
                        >
                          Add Route
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="/location/form"
                          style={{ textDecoration: "none" }}
                        >
                          Add Location
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="/vehicle/form"
                          style={{ textDecoration: "none" }}
                        >
                          Add Vehicle
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link
                          to="/login"
                          onClick={clearUser}
                          style={{ textDecoration: "none" }}
                        >
                          Logout
                        </Link>
                      </MenuItem>
                    </Menu>
                  </span>
                </>
              )}
            </Navbar>
          </>
        </>
      ) : (
        <Route exact path="/" render={() => <Redirect to="/login" />} />
      )}
    </>
  );
};

export default NavBar;
