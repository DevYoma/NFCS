import "./Members.scss";
import useFetchUsers from "../../hooks/useFetchUsers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatBirthday } from "../../utils/helper";

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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Team</th>
            <th>DOB</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, i) => (
            <tr key={user.id} onClick={() => handleViewStudent(user)}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.department}</td>
              <td>{user.team}</td>
              <td>{formatBirthday(user.birthday)}</td>
              <td>{user.telephone}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Members;
