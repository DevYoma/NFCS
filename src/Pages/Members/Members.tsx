import "./Members.scss";
import useFetchUsers from "../../hooks/useFetchUsers";

export type FbDataType = {
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
}[];

const Members = () => {
  const users: FbDataType = useFetchUsers();

  // console.log(users);

  const handleViewStudent = () => {
    alert("Working")
  }

  return (
    <div className="members">
      <h1>Members Page</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Team</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id}  onClick={handleViewStudent}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.department}</td>
              <td>{user.team}</td>
              <td>{user.birthday}</td>
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
