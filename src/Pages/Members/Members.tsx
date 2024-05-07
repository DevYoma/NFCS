import "./Members.scss";
import useFetchUsers from "../../hooks/useFetchUsers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatBirthday } from "../../utils/helper";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";

type FbDataType = {
  id: string | number;
  name: string;
  team: string;
  level: string;
  email: string;
  department: string;
  birthday: string;
  teampass?: string;
  admin?: boolean;
  img?: string;
  telephone?: string;
};

const Members = () => {
  const users: FbDataType[] = useFetchUsers();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedTeam, setSelectedTeam] = useState("All");
  const navigate = useNavigate();

  const filteredUsers = users.filter(
    (user) => selectedTeam === "All" || user.team === selectedTeam
  );

  const handleChangeTeam = (event: any) => {
    setSelectedTeam(event.target.value);
  };

  // console.log(users);

  const handleViewStudent = (user: FbDataType) => {
    // route excos to user Details page
    navigate(`/users/${user.team}/${user.id}`);
  };

  const handlePageChange = (
    event: React.MouseEvent | null,
    newpage: number
  ) => {
    setPage(newpage);
  };

  const handleRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="members">
      <h1 className="membersHeader">Members Page</h1>
      <select
        value={selectedTeam}
        onChange={handleChangeTeam}
        className="membersSelect"
      >
        <option value="All">All Teams</option>
        {/* Add options dynamically based on unique teams in users */}
        {users
          .map((user) => user.team)
          .filter((team, index, arr) => arr.indexOf(team) === index) // Get unique teams
          .map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
      </select>

      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="simple table"  >
        <TableHead>
          <TableRow>
            <TableCell size="small">ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers
          .slice(page * rowsPerPage, page*rowsPerPage + rowsPerPage)
          .map((user, i) => ( 
            <TableRow
              key={i}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              sx={{ cursor: "pointer" }}
              onClick={() => handleViewStudent(user)}
            >
              {/* <TableCell component="th" scope="row">
                {i + 1}
              </TableCell> */}
              <TableCell component="th">{i + 1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>{user.team}</TableCell>
              <TableCell>{formatBirthday(user.birthday)}</TableCell>
              <TableCell>{user.telephone}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>

        <TablePagination 
          rowsPerPageOptions={[10, 25, 50, 100]}
          page={page}
          rowsPerPage={rowsPerPage}
          component="div"
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPage}
          // count={rowsPerPage}
          count={filteredUsers.length}
        />

        {/* </TablePagination> */}
    </TableContainer>
    </div>
  );
};

export default Members;
