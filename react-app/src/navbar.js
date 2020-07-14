import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Navbar } from "reactstrap";
import { Link } from "react-router-dom";
import BarChartIcon from "@material-ui/icons/BarChart";
import ListIcon from "@material-ui/icons/List";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import DirectionsIcon from "@material-ui/icons/Directions";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import { FaRegCalendarPlus } from "react-icons/fa";

const NavBar = (props) => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;
  const mode = props.mode;
  const handleModeChange = props.handleModeChange;

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
                    <Link to="/entry/form">
                      <PlaylistAddIcon
                        style={{ fontSize: 30 }}
                        color="action"
                        className="navbar-icon"
                      />
                    </Link>
                  </span>
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
                    <Link to="/date/form">
                      <DateRangeIcon
                        style={{ fontSize: 30 }}
                        color="action"
                        className="navbar-icon"
                      />
                    </Link>
                  </span>
                  <span className="nav-icon">
                    <Link to="/location/form">
                      <AddLocationIcon
                        style={{ fontSize: 30 }}
                        color="action"
                        className="navbar-icon"
                      />
                    </Link>
                  </span>
                  <span className="nav-icon">
                    <Link to="/route/form">
                      <DirectionsIcon
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
