import { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import { fetchFirebaseUsers } from '../../utils/getFirebaseUsers';

const Members = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const userList = await fetchFirebaseUsers();
        setUsers(userList);
      }catch(error: any){
        console.log('Error fetching users', error);
      }
    }

    fetchData()
  }, [])

  // console.log(users);

  return (
    <div>
      <Navbar isLoggedIn/>
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
            <tr key={user.id}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.department}</td>
              <td>{user.team}</td>
              <td>{user.birthday}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Members