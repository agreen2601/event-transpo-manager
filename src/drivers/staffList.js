import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { FaRegEdit } from "react-icons/fa";
import apiManager from "../api/apiManager";

const StaffList = (props) => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    apiManager.getAllType("users").then((r) => {
      r.sort((a, b) => a.first_name.localeCompare(b.first_name))
        .sort((c, d) => d.is_staff - c.is_staff)
        .sort((c, d) => d.is_superuser - c.is_superuser);
      setUsers(r);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const editIconStyle = {
    fontSize: 20,
    paddingBottom: 2,
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Staff List
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Authorizations</TableCell>
              {props.isSupervisor === true ? (
                <TableCell style={{ fontWeight: 600 }}>Actions</TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="table_rows">
                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>
                {user.is_superuser === true ? (
                  <TableCell>Admin</TableCell>
                ) : (
                  <>
                    {user.is_staff === true ? (
                      <TableCell>Supervisor</TableCell>
                    ) : (
                      <TableCell>Staff</TableCell>
                    )}
                  </>
                )}
                {props.isSupervisor === true ? (
                  <TableCell>
                    <span className="action-icon">
                      <FaRegEdit
                        onClick={() =>
                          props.history.push(`/staff/edit/${user.id}`)
                        }
                        style={editIconStyle}
                      />
                    </span>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StaffList;
